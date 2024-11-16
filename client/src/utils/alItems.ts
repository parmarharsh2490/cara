
export const allItems = (a : any) => {
    const data : any  = []    
    
  a && a.pages &&  a.pages.map((page :any) => {
    data.push(...page)
    })
    return data
}
