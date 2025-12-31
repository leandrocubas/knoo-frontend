import { computed, ref } from 'vue'
import { useStorage } from './useStorage'
import { LoginEnum } from '@/enums/login.enum'
import { Mask } from 'maska'

export function useUtils(){
    const { set } = useStorage()

    const urlRegex = /^(http:\/\/www\.|https:\/\/www\.|http:\/\/|https:\/\/)[a-z0-9]+([\-\.]{1}[a-z0-9]+)*\.[a-z]{2,5}(:[0-9]{1,5})?(\/.*)?$/
    const fullNameRegex = /^[a-zA-ZÀ-ÖØ-öø-ÿ]+(?: [a-zA-ZÀ-ÖØ-öø-ÿ]+)+$/
    const baseURLImages = ref(import.meta.env.VITE_S3_BUCKET_IMAGES)
    
    const isValidCPF = (cpf: string): boolean => /^\d{3}\.\d{3}\.\d{3}-\d{2}$/.test(cpf)

    const formatMoney = (amount: number, showCurrency = true): string => new Intl.NumberFormat('pt-BR', {
		style: 'currency',
		currency: 'BRL',
    currencyDisplay: showCurrency ? 'symbol' : 'code'
	}).format(amount).replace('BRL', '').trim()

    const isValidEmail = (email: string): boolean => email ? /^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/.test(email) : false

    /**
     * @name hasSpecialCharacters
     * @description Verifica se há caracteres especiais na string. Considera como válidos letras (incluindo acentuação), números e espaços.
     * @param text Texto a ser validado
     * @returns boolean
     */
    const hasSpecialCharacters = (text: string): boolean => /[^a-zA-Z0-9À-ÖØ-öø-ÿ\s]/.test(text)

    const isMobile = computed(() => window.innerWidth <= 810)

    const storageToken = (token: string): void => {
        set(LoginEnum.TOKEN_KEY, token)
    }

    const isFileSize5MB = (file: File): boolean => {
        const sizeInMB = 5 * 1024 * 1024 
        return file.size <= sizeInMB
    }

    const timeToSeconds = (time: string): number => {
        if(time){
            const [hours, minutes, seconds] = time.split(':').map(parseFloat)
            return (hours * 3600) + (minutes * 60) + seconds
        }

        return 0
    }

    /**
     * @name timeToMilliSeconds
     * @description Converte uma string no formato 'hh:mm:ss' para milisegundos
     * @param time String no formato 'hh:mm:ss'
     * @returns number
     */
    const timeToMilliSeconds = (time: string): number => {
        
        if(time){
            const [hours, minutes, seconds] = time.split(':').map(parseFloat)

            return ((hours * 3600) + (minutes * 60) + seconds) * 1000
        }

        return 0
    }

    /**
     * @name millisecondsToTime
     * @description Converte milisegundos para o formato 'hh:mm:ss'
     * @param milliseconds Tempo em milisegundos
     * @returns string
     */
    const millisecondsToTime = (milliseconds: number): string => {
  
        const hours = Math.floor(milliseconds / 3600000)
        const minutes = Math.floor((milliseconds % 3600000) / 60000)
        const seconds = Math.floor((milliseconds % 60000) / 1000)

        return [
            hours.toString().padStart(2, '0'),
            minutes.toString().padStart(2, '0'),
            seconds.toString().padStart(2, '0')
        ].join(':')
    }


    /**
     * @name cursorFollowEffect
     * @description Função que faz um elemento seguir sempre o cursor enquanto estiver dentro de um elemento especifico.
     * @param boxID ID do elemento onde o cursorID será acionado
     * @param cursorID ID do elemento que irá seguir o mouse
     * @returns void
     */
    const cursorFollowEffect = (boxID: string, cursorID: string): void => {
        document.addEventListener('DOMContentLoaded', () => {
            const box = document.getElementById(boxID)
            const cursor = document.getElementById(cursorID)
        
            if(box && cursor){
              box?.addEventListener('mousemove', (e: any) => {
                const x = e.clientX - box.offsetLeft - (cursor.offsetWidth / 2)
                const y = e.clientY - box.offsetTop - (cursor.offsetHeight / 2)
                cursor.style.left = `${x}px`
                cursor.style.top = `${y}px`
              })
            
              box.addEventListener('mouseleave', () => {
                cursor.style.display = 'none'
              })
            
              box.addEventListener('mouseenter', () => {
                cursor.style.display = 'block'
              })
            }
          
          })
    }

    /**
     * 
     * @name mask
     * @param value Valor que será mascarado.
     * @param _mask Mascara a ser usada. Ex.: (##) #####-###
     * @returns Retorna o value mascadado com a _mask passada.
     */
    const mask = (value: string, _mask: string): string => {
        const mask = new Mask({ mask: _mask })
        return mask.masked(value.toString())
    }
    
    /**
     * @name slugify
     * @description Formata string para slug
     * @param text Valor de entrada para ser formatado
     * @returns string
     */
    function slugify(text: string): string {
        return text
            .normalize('NFKD')
            .replace(/[\u0300-\u036F]/g, '')
            .toLowerCase()
            .replace(/[^a-z0-9 -]/g, '')
            .replace(/\s+/g, '-')
            .replace(/-+/g, '-')
    }

    const format_pix = (key: string): string => ({
        'mobile_phone' : '(##) #####-####',
        'cpf' : '###.###.###-##',
        'cnpj' : '##.###.###/####-##',
    }[key] || '')
    
    const convertFileToBase64 = (file?: File): Promise<string> => {
        if(!file) return new Promise((resolve, _) => resolve(''))

        return new Promise((resolve, reject) => {
          const reader = new FileReader()
          reader.readAsDataURL(file)
      
          reader.onload = () => {
            const base64String = (reader.result as string).split(',')[1]
            resolve(base64String)
          }
      
          reader.onerror = (error) => {
            reject(error)
          }
        })
    }

    const convertDateToISOFormat = (date: string): string => {
      const [day, month, year] = date.split('/')
      return `${year}-${month}-${day}`
    }

    const convertFileToBuffer = (file: File): Promise<Uint8Array | null> => {
      return new Promise((resolve, reject) => {
        const reader = new FileReader()
  
        reader.onload = () => {
          resolve(new Uint8Array(reader.result as ArrayBufferLike))
        }
  
        reader.onerror = error => {
          
          reject(error)
        }
  
        reader.readAsArrayBuffer(file)
      })
    }
    
    return {
        isMobile,
        urlRegex,
        baseURLImages,
        fullNameRegex,
        isValidEmail,
        isValidCPF,
        formatMoney,
        storageToken,
        timeToSeconds,
        timeToMilliSeconds,
        millisecondsToTime,
        cursorFollowEffect,
        mask,
        slugify,
        isFileSize5MB,
        format_pix,
        convertFileToBase64,
        convertDateToISOFormat,
        convertFileToBuffer,
        hasSpecialCharacters
    }
}