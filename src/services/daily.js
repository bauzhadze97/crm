import defaultInstance from '../plugins/axios';

export const getDailyList = async (page = 1, limit = 10, sortBy = 'created_at', order = 'desc') => {
    try {
        const response = await defaultInstance.get('/api/dailies', {
            params: {
                page: page,
                limit: limit,
                sortBy: sortBy,
                order: order
            }
        });
        return response;
    } catch (error) {
        console.error('Error fetching daily list:', error);
        throw error;
    }
};

export const createDaily = async (data) => {
    return defaultInstance.post('/api/dailies', data);
}

export const getDaily = async (id) => {
    return defaultInstance.get(`/api/dailies/${id}`);
}

export const updateDaily = async (id, data) => {
    return defaultInstance.put(`/api/dailies/${id}`, data);
}

export const deleteDaily = async (id) => {
    return defaultInstance.delete(`/api/dailies/${id}`);
}
