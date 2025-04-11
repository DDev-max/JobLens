import type { SupportedLanguageKeys } from '#search/shared/types.ts'

export const currencies = '€¥₡₩$£'
export const hoursPerDay = 8
export const daysPerWeek = 5
export const weeksPerMonth = 4

export const thousandAbbreviation = 1000
export const moneyRegex = new RegExp(`[${currencies}]\\S+`, 'g')
export const grammarWords: Record<SupportedLanguageKeys, string[]> = {
  // prettier-ignore
  EN: ['and','such','to','ll','or','of','for','in','with','at','on','by','from','as','the','a','an','be','have','other','you','has','had','is','are','was','were','will','shall','should','etc','can','could','would','may','might','must','not','but','if','although','while','during','between','among','into','through','within','before','after','besides','along','under','over','above','below','without','except','unless','until','each','every','some','any','many','few','several','all','both','one','two','three','first','second','next','last','current','former','new','old','active','passive','essential','required','preferred','desired','expected','capable','able','responsible','dedicated','focused','qualified','professional','skilled','experienced','motivated','proficient','knowledgeable','strong','good','excellent','advanced','intermediate','basic',
  ],
  // prettier-ignore
  ES: ['y','a','o','de','para','en','con','por','sobre','entre','durante','antes','después','al','como','si','aunque','mientras','cada','algún','mucho','poco','varios','todos','uno','dos','primero','segundo','último','nuevo','antiguo','actual','anterior','requerido','preferido','deseado','necesario','capaz','responsable','dedicado','enfocado','calificado','profesional','habilidoso','experimentado','motivados','competente','conocimiento','fuerte','bueno','excelente','avanzado','intermedio','básico','necesita','requiere','esperado','disponible','posible','potencial','enfocar','trabajar','aplicar','gestionar','supervisar','coordinar','desarrollar','ejecutar','realizar','liderar','contribuir','colaborar','adaptarse','cumplir','apoyar','demostrar','promover','analizar','organizar','presentar','comunicar','planificar','incluir','exigir','mostrar','crear','priorizar','comprometido','constante','flexible','innovador','entusiasta','proactivo','disciplinado','orientado','objetivos','trabajo en equipo','proyectos','responsabilidad','desafíos','iniciativa','creatividad','oportunidades','ambiente','exitoso','resultados','capacitación','desarrollo','crecimiento','experiencia','formación','educación','habilidades',
  ],
}
