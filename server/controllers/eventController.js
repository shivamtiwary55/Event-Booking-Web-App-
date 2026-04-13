const Event = require('../models/events');

exports.getAllEvents = async (req, res) => {
    try {

        const filters = {};
        if (req.query.category) {
            filters.category = req.query.category;
        }
        if (req.query.ticketPrice) {
            filters.ticketPrice = req.query.ticketPrice;
        }


        const events = await Event.find(filters);
        res.json(events);
    } catch (err) {
        res.status(500).json({message: err.message});
    }
};

exports.getEventById = async (req, res) => {
    try {
        const event = await Event.findById(req.params.id);
        if (!event) {
            return res.status(404).json({message: 'Event not found'});
        }
        res.json(event);
    } catch (err) {
        res.status(500).json({message: err.message});
    }
};

exports.createEvent = async (req, res) => {
    const{title, description, date, location, category, ticketPrice,imgUrl} = req.body;
    try {
        const event = await Event.create(
            {title, description, date, location, category, ticketPrice,imgUrl});
        res.status(201).json(event);
    } catch (err) {
        res.status(400).json({message: err.message});
    }       
};

exports.updateEvent = async (req, res) => {
    const{title, description, date, location, category, ticketPrice,imgUrl} = req.body;
    try {
        const event = await Event.findByIdAndUpdate(req.params.id,{
            title, description, date, location, category, ticketPrice,imgUrl
        },{new: true});
        if (!event) {
            return res.status(404).json({message: 'Event not found'});
        }
        res.json(event);
    } catch (err) {
        res.status(400).json({message: err.message});
    }
};

exports.deleteEvent = async (req, res) => {
    try {
        const event = await Event.findByIdAndDelete(req.params.id);
        if (!event) {
            return res.status(404).json({message: 'Event not found'});
        }
        res.json({message: 'Event deleted successfully'});
    }
    catch (err) {
        res.status(500).json({message: err.message});
    }
};



