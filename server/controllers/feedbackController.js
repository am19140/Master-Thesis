import Feedback from '../models/Feedback.js'; 

export const submitFeedback = async (req, res) => {
    console.log(req.body);
    const temperaturePreference = req.body.usual_behaviour;
    const perception  = req.body.perception;
    const floor = req.body.floor;
    const room = req.body.room;
    console.log("Temp",temperaturePreference);
    console.log("Perception", perception);
    const now = new Date();
    const timestamp = now.toISOString();

    try {
        
        const newFeedback = await Feedback.create({
            temperaturePreference,
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
        console.error("Error submitting feedback:", error);
        res.status(500).json({
            message: "Failed to submit feedback",
            error: error.message
        });
    }
};

export const getAveragePerception = async (req, res) => {
    const roomId = req.params.roomId;
    console.log('----------------------', roomId);
    try {
        const feedbackList = await Feedback.findAll({
            where: { room: roomId },
            attributes: ['perception','temperaturePreference']
        });

        console.log('the data i get:',feedbackList);

        const userLastFeedback = await Feedback.findOne({
            where: { room: roomId },
            order: [['timestamp', 'DESC']]
        });

        console.log('last feedback',userLastFeedback);

        if (feedbackList.length > 0) {
            
            const perceptionCounts = {};
            feedbackList.forEach(fb => {
                
                perceptionCounts[fb.perception] = (perceptionCounts[fb.perception] || 0) + 1;
            });
            console.log('COUNTS: ',perceptionCounts);

           

            // Finding the highest count to determine the most common perception
            let maxCount = 0;
            let mostCommonPerceptions = [];
            Object.entries(perceptionCounts).forEach(([perception, count]) => {
                if (count > maxCount) {
                    console.log('Highest perception: ',perception);
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
            const userPerceptionName = userLastFeedback ? perceptionTags[userLastFeedback.perception] : null;
            const userAgrees = userLastFeedback && mostCommonPerceptions.includes(userLastFeedback.perception.toString());
            console.log(commonPerceptionNames);

            let message = '';
            let badge=[];
            if (isTooControversial) {
                console.log('Too controversial');                
                message = "This room is too controversial to determine a clear majority perception.";
            } else if (isControversial) {
                console.log('controversial');
                // wrong result if there are a lot of feedback cause it finds the largest but says controversial
                message = `Controversial room. Equally voted it as ${commonPerceptionNames.join(' and ')}.`;
                badge.push(commonPerceptionNames[0],commonPerceptionNames[1]);
            } else {
                console.log('User agrees');
                badge.push(commonPerceptionNames[0],commonPerceptionNames[1]);
                message = userAgrees ? 
                // smth wrong?
                    `Most students, including you, perceive this room as ${commonPerceptionNames.join(' and some as ')}.` : 
                    `Most students perceive this room as ${commonPerceptionNames.join(' and ')}, unlike you.`;
            }
            
            
            res.json({
                commonPerceptions: commonPerceptionNames,
                userPerception: userPerceptionName,
                userAgrees: userAgrees,
                badgeContent: badge,
                isControversial: isControversial,
                message: message});
        } else {
            res.status(404).json({ message: "You are the first to submit feedback for this room." });
        }
        } catch (error) {
            console.error('Error fetching feedback:', error);
            res.status(500).json({ message: "Error accessing feedback data." });
        }
};
