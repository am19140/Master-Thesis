import Feedback from '../models/Feedback.js'; 

export const submitFeedback = async (req, res) => {
    console.log(req.body);
    const temperaturePreference = req.body.usual_behaviour;
    const perception  = req.body.perception;
    const floor = req.body.floor;
    console.log("Temp",temperaturePreference);
    console.log("Perception", perception);
    const now = new Date();
    const timestamp = now.toISOString();

    try {
        
        const newFeedback = await Feedback.create({
            temperaturePreference,
            perception,
            floor,
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
