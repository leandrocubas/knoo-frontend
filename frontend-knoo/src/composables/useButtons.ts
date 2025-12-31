export function useButtons(){

    const getClassByType = (type: string): string =>
        type === 'submit' ? 'button--primary' : `button--${type}`
    
    return {
        getClassByType
    }
}