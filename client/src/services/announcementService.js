import api from "./api";

export async function getServices() {
    const response = await api.get("/services");
    return response.data;
    
}
export async function getServiceById(id) {
    const response = await api.get(`/services/${id}`);
    return response.data;
}
