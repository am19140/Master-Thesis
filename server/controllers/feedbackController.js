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
            attributes: ['perception']
        });

        if (feedbackList.length > 0) {
            
            const perceptionCounts = {};
            feedbackList.forEach(fb => {
                
                perceptionCounts[fb.perception] = (perceptionCounts[fb.perception] || 0) + 1;
            });
            console.log(perceptionCounts);
            // Find the highest count to determine the most common perception
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

            
            const isControversial = mostCommonPerceptions.length > 1;

            
            const perceptionTags = {
                '3': 'Hot',
                '2': 'Warm',
                '1': 'Slightly Warm',
                '0': 'Comfortable',
                '-1': 'Slightly Cool',
                '-2': 'Cool',
                '-3': 'Cold'
            };

            const commonPerceptions = mostCommonPerceptions.map(p => perceptionTags[p]);

            res.json({
                mostCommonPerceptions: commonPerceptions,
                isControversial: isControversial,
                message: isControversial ? 'This room is controversial.' : `Most students perceive this room as ${commonPerceptions.join(' and ')}.`
            });
        } else {
            res.status(404).json({ message: "You are the first to submit feedback for this room." });
        }
        } catch (error) {
            console.error('Error fetching feedback:', error);
            res.status(500).json({ message: "Error accessing feedback data." });
        }
};
