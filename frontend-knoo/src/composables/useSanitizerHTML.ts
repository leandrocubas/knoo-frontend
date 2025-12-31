export function useSanitizerHTML(){

    const sanitizeHTML = (html: string) => {
        const template = document.createElement('template')
        template.innerHTML = html
        removeDangerousTags(template.content, ['script', 'style'])
        removeDangerousAttributes(template.content)
      
        return template.innerHTML
    }

    const removeDangerousTags = (parent: DocumentFragment, tags: Array<string>) => {
        tags.forEach(tag => {
            const elements = parent.querySelectorAll(tag)
            elements.forEach(element => element.remove())
          })
    }

    const removeDangerousAttributes = (parent: DocumentFragment) => {
        const walk: TreeWalker = document.createTreeWalker(parent, NodeFilter.SHOW_ELEMENT, null)
        const dangerousAttributes = ['onclick', 'onerror', 'onload', 'onmouseover', 'onfocus', 'onblur', 'onchange']
        let node: Node | HTMLElement | null  = walk.nextNode()

        while(node) {
            if(node instanceof HTMLElement){
                dangerousAttributes.forEach((attr: string) => {
                    if ((node as HTMLElement).getAttribute(attr) !== null) {
                        (node as HTMLElement).removeAttribute(attr)
                    }
                })
            }
          node = walk.nextNode()
        }
    }
    
    return {
        sanitizeHTML
    }
}