import type { DirectiveBinding } from 'vue'


const updateClass = (el: HTMLElement, binding: DirectiveBinding<(el: HTMLElement) => void>) => {
  let baseClass = el.classList[0]
      if (baseClass && baseClass.includes('--')) {
        baseClass = baseClass.split('--')[0]
      }

      Object.entries(binding.value).forEach(([className, applyClass]) => {
        const cssModifier = baseClass ? `${baseClass}--${className}` : className
        if (applyClass) {
          el.classList.add(cssModifier)

          return
        }

        el.classList.remove(cssModifier)
    })
}

const vClass = {
    mounted: (el: HTMLElement, binding: DirectiveBinding<(el: HTMLElement) => void>) => updateClass(el, binding),
    updated(el: HTMLElement, binding: DirectiveBinding<(el: HTMLElement) => void>) {
      if (binding.oldValue !== binding.value) updateClass(el, binding)
    }
}



export default vClass