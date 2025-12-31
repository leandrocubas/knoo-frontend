export function useStorage(){

    const get = <T>(token: string): T | null => {
        const value = window.localStorage.getItem(token)
        if(value){
            return JSON.parse(value) as T
        }

        return null
    }

    const set = (token: string, value: any) =>
        window.localStorage.setItem(token, JSON.stringify(value))

    const clear = () => window.localStorage.clear()

    const del = (token: string) => window.localStorage.removeItem(token)
    
    return {
        get,
        set,
        clear,
        del
    }
}