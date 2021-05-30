const STORAGE_CITIES = "CITIES";
export default {
    getCity() {
        return JSON.parse(localStorage.getItem(STORAGE_CITIES)) || "";
    },
    setCity(city) {
        localStorage.setItem(STORAGE_CITIES, JSON.stringify(city));
    }
}