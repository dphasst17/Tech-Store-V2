export const pagination = (itemsInPage:number,dataLength:number) => {
    return Math.round(dataLength/itemsInPage)
}