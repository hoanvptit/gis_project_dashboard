const DASHBOARD_STORAGE_KEY = 'DASHBOARD';
export default {
    getTitles() {
        return JSON.parse(localStorage.getItem(DASHBOARD_STORAGE_KEY)) || [];
    },
    setTitles(titles){
        localStorage.setItem(DASHBOARD_STORAGE_KEY,JSON.stringify(titles));
    },
    removeTitles(){
        localStorage.removeItem(DASHBOARD_STORAGE_KEY)
    }
}