const { LeaveSummary } = require('../models'); 

class LeaveSummaryController {

  static async create(req, res) {
    try {
      const { employeeName, leaveDay, fromDate, toDate, activity } = req.body;
      const newLeaveSummary = await LeaveSummary.create({
        employeeName,
        leaveDay,
        fromDate,
        toDate,
        activity,
      });
      return res.status(201).json(newLeaveSummary);
    } catch (error) {
      return res.status(500).json({ error: error.message });
    }
  }

  // Get all leave summaries
  static async getAll(req, res) {
    try {
      const leaveSummaries = await LeaveSummary.findAll();
      return res.status(200).json(leaveSummaries);
    } catch (error) {
      return res.status(500).json({ error: error.message });
    }
  }

  // Get a specific leave summary by ID
  static async getById(req, res) {
    try {
      const { id } = req.params;
      const leaveSummary = await LeaveSummary.findByPk(id);
      if (!leaveSummary) {
        return res.status(404).json({ error: 'Leave Summary not found' });
      }
      return res.status(200).json(leaveSummary);
    } catch (error) {
      return res.status(500).json({ error: error.message });
    }
  }

  // Update a leave summary by ID
  static async update(req, res) {
    try {
      const { id } = req.params;
      const { employeeName, leaveDay, fromDate, toDate, activity } = req.body;
      const [updated] = await LeaveSummary.update(
        { employeeName, leaveDay, fromDate, toDate, activity },
        { where: { id } }
      );
      if (!updated) {
        return res.status(404).json({ error: 'Leave Summary not found' });
      }
      const updatedLeaveSummary = await LeaveSummary.findByPk(id);
      return res.status(200).json(updatedLeaveSummary);
    } catch (error) {
      return res.status(500).json({ error: error.message });
    }
  }

  // Delete a leave summary by ID
  static async delete(req, res) {
    try {
      const { id } = req.params;
      const deleted = await LeaveSummary.destroy({ where: { id } });
      if (!deleted) {
        return res.status(404).json({ error: 'Leave Summary not found' });
      }
      return res.status(204).send();
    } catch (error) {
      return res.status(500).json({ error: error.message });
    }
  }
}

module.exports = LeaveSummaryController;
