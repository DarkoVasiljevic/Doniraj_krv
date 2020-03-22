const models = require('../models');
const utils = require('../utils');

/**
 * Encapsulates BloodGroup service operations
 */
class BloodGroupService {
    constructor({ logger, config }) {
        this.logger = logger;
        this.config = config;
    }

    async create(data, id = null) {
        this.logger.debug(`create(data=${data})`);
        if (data == null) {
            throw new Error('No place data');
        }

        const bloodGroup = utils.clone(data);
        if (id != null) {
            bloodGroup._id = id;
        }

        const result = await models.BloodGroup.create(bloodGroup);
        return result._id;
    }

    async find(query, fields = null) {
        this.logger.debug(`find ${query}`);
        return models.BloodGroup.find(query)
            .populate(fields)
            .lean()
            .exec();
    }

    async findById(id, fields = null) {
        this.logger.debug(`findById ${id}`);
        return models.BloodGroup.findById(id).populate(fields).lean().exec();
    }

    async findCompatible(searchFor, groups) {
        const compatibleMap = this.config.bloodGroups.compatibleBloodGroups;

        if (searchFor === 'ALL') {
            return this.config.bloodGroups.all;
        }

        if (searchFor === 'SPECIFIC') {
            return groups;
        }

        if (searchFor === 'COMPATIBLE') {
            const compatibleGroups = [];

            groups.forEach((group) => {
                compatibleGroups.push(compatibleMap[group]);
            });

            return [].concat(...groups);
        }

        throw Error('Los parametar za pretragu!');
    }

    async removeById(id) {
        this.logger.debug(`removeById by ID ${id}`);
        return models.BloodGroup.deleteOne({ _id: id });
    }
}

module.exports = BloodGroupService;
