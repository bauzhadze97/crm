import defaultInstance from '../plugins/axios'


export const getDailyList = async () => {
    return defaultInstance.get('/api/dailies')
}

export const createDaily = async (data) => {
    return defaultInstance.post('/api/dailies', data)
}

export const getDaily = async (id) => {
    return defaultInstance.get(`/api/dailies/${id}`)
}

export const updateDaily = async (id, data) => {
    return defaultInstance.put(`/api/dailies/${id}`, data)
}

export const deleteDaily = async (id) => {
    return defaultInstance.delete(`/api/dailies/${id}`)
}
