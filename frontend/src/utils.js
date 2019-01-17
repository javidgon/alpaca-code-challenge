import Cookies from "js-cookie";
import _ from 'lodash';
import moment from "moment";

export let isUserLoggedIn = () => {
    return !_.isUndefined(Cookies.get('token'));
};

export let setAuthToken = (token) => {
    Cookies.set('token', token, {expires: 7});
};

export let getAuthToken = () => {
    return Cookies.get('token');
};

export let removeAuthToken = () => {
    return Cookies.remove('token');
};

export let getHeaders = () => {
    return {
        headers: {
            Authorization: `Token ${getAuthToken()}`
        }
    };
};

export let getNumHoursPerDate = (tasks) => {
    const numHoursPerDate = {};

    _.forEach(tasks, (value, key) => {
        if (!numHoursPerDate[value.date]) {
            numHoursPerDate[value.date] = 0;
        }
        numHoursPerDate[value.date] += value.duration;
    });
    return numHoursPerDate;
};

export let selectTasksWithinDateRange = (tasks, fromStr, toStr) => {
    const fromDate = moment(fromStr).toDate();
    const toDate = moment(toStr).toDate();

    return _.filter(tasks, (task) => {
        return moment(task.date).isBetween(fromDate, toDate, 'days', '[]')
    });

};

export let aggregateTaskByDate = (tasks) => {
    let aggregatedTasks = {};

    _.forEach(tasks, (value, key) => {
        if (!aggregatedTasks[value.date]) {
            aggregatedTasks[value.date] = []
        }
        aggregatedTasks[value.date].push(value)
    });
    return aggregatedTasks;
};