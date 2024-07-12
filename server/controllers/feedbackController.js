import Feedback from '../models/Feedback.js'; 

export const submitFeedback = async (req, res) => {
    const perception  = req.body.perception;
    const floor = req.body.floor;
    const room = req.body.room;
    const now = new Date();
    const timestamp = now.toLocaleString();

    try {
        
        const newFeedback = await Feedback.create({
            // temperaturePreference,
            perception,
            floor,
            room,
            timestamp
        });

       
        res.status(201).json({
            message: "Feedback successfully submitted",
            feedback: newFeedback
        });
    } catch (error) {
        res.status(500).json({
            message: "Failed to submit feedback",
            error: error.message
        });
    }
};

export const getAveragePerception = async (req, res) => {
    const roomId = req.params.roomId;
    const userLastFeedback = req.params.userfeedback || null;
    
    try {
        const feedbackList = await Feedback.findAll({
            where: { room: roomId },
            attributes: ['perception']
        });


        if (feedbackList.length > 0) {
            const perceptionCounts = {};
            feedbackList.forEach(fb => {
                perceptionCounts[fb.perception] = (perceptionCounts[fb.perception] || 0) + 1;
            });

            // Finding the highest count to determine the most common perception
            let maxCount = 0;
            let mostCommonPerceptions = [];
            Object.entries(perceptionCounts).forEach(([perception, count]) => {
                if (count > maxCount) {
                    mostCommonPerceptions = [perception];
                    maxCount = count;
                } else if (count === maxCount) {
                    mostCommonPerceptions.push(perception);
                }
            });


            const isControversial = mostCommonPerceptions.length == 2;
            const isTooControversial = mostCommonPerceptions.length > 2;

            const perceptionTags = {
                '3': 'hot',
                '2': 'warm',
                '1': 'slightly warm',
                '0': 'comfortable',
                '-1': 'slightly cool',
                '-2': 'cool',
                '-3': 'cold'
            };

            const commonPerceptionNames = mostCommonPerceptions.map(perception => perceptionTags[perception]);
            const userPerceptionName = userLastFeedback ? perceptionTags[userLastFeedback] : null;
            const userAgrees = userLastFeedback && mostCommonPerceptions.includes(userLastFeedback.toString());

            let message = '';
            let message1 = '';
            let badge = [];
            if (isTooControversial) {
                message = "This room is too controversial to determine a clear majority perception.";
                message1 = "This room is too controversial to determine a clear majority perception.";
            } else if (isControversial) {
                message = `Controversial room. Equally voted it as ${commonPerceptionNames.join(' and ')}.`;
                message1 = `Controversial room. Equally voted it as ${commonPerceptionNames.join(' and ')}.`;
                badge.push(commonPerceptionNames[0], commonPerceptionNames[1]);
            } else {
                badge.push(commonPerceptionNames[0], commonPerceptionNames[1]);
                message1 = `Most students perceive this room as ${commonPerceptionNames.join(' and some as ')}.`;

                message = userAgrees ?
                    `Most students, including you, perceive this room as ${commonPerceptionNames.join(' and some as ')}.` :
                    `Most students perceive this room as ${commonPerceptionNames.join(' and ')}, unlike you.`;
            }

            res.json({
                commonPerceptions: commonPerceptionNames,
                userPerception: userPerceptionName,
                userAgrees: userAgrees,
                badgeContent: badge,
                isControversial: isControversial,
                message: message,
                message1: message1
            });
        } else {
            res.status(404).json({ message: "You are the first to submit feedback for this room." });
        }
        } catch (error) {
            res.status(500).json({ message: "Error accessing feedback data." });
        }
};
