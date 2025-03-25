import type { SupportedLanguageKeys } from '@/data/types'

export const currencies = '€¥₡₩$£'
export const hoursPerDay = 8
export const daysPerWeek = 5
export const weeksPerMonth = 4
export const thousandAbbreviation = 1000

export const moneyRegex = new RegExp(`[${currencies}]\\S+`, 'g')

export const grammarWords: Record<SupportedLanguageKeys, string[]> = {
  EN: [
    'and',
    'such',
    'to',
    'll',
    'or',
    'of',
    'for',
    'in',
    'with',
    'at',
    'on',
    'by',
    'from',
    'as',
    'the',
    'a',
    'an',
    'be',
    'have',
    'other',
    'you',
    'has',
    'had',
    'is',
    'are',
    'was',
    'were',
    'will',
    'shall',
    'should',
    'etc',
    'can',
    'could',
    'would',
    'may',
    'might',
    'must',
    'not',
    'but',
    'if',
    'although',
    'while',
    'during',
    'between',
    'among',
    'into',
    'through',
    'within',
    'before',
    'after',
    'besides',
    'along',
    'under',
    'over',
    'above',
    'below',
    'without',
    'except',
    'unless',
    'until',
    'each',
    'every',
    'some',
    'any',
    'many',
    'few',
    'several',
    'all',
    'both',
    'one',
    'two',
    'three',
    'first',
    'second',
    'next',
    'last',
    'current',
    'former',
    'new',
    'old',
    'active',
    'passive',
    'essential',
    'required',
    'preferred',
    'desired',
    'expected',
    'capable',
    'able',
    'responsible',
    'dedicated',
    'focused',
    'qualified',
    'professional',
    'skilled',
    'experienced',
    'motivated',
    'proficient',
    'knowledgeable',
    'strong',
    'good',
    'excellent',
    'advanced',
    'intermediate',
    'basic',
  ],

  ES: [
    'y',
    'a',
    'o',
    'de',
    'para',
    'en',
    'con',
    'por',
    'sobre',
    'entre',
    'durante',
    'antes',
    'después',
    'al',
    'como',
    'si',
    'aunque',
    'mientras',
    'cada',
    'algún',
    'mucho',
    'poco',
    'varios',
    'todos',
    'uno',
    'dos',
    'primero',
    'segundo',
    'último',
    'nuevo',
    'antiguo',
    'actual',
    'anterior',
    'requerido',
    'preferido',
    'deseado',
    'necesario',
    'capaz',
    'responsable',
    'dedicado',
    'enfocado',
    'calificado',
    'profesional',
    'habilidoso',
    'experimentado',
    'motivados',
    'competente',
    'conocimiento',
    'fuerte',
    'bueno',
    'excelente',
    'avanzado',
    'intermedio',
    'básico',
    'necesita',
    'requiere',
    'esperado',
    'disponible',
    'posible',
    'potencial',
    'enfocar',
    'trabajar',
    'aplicar',
    'gestionar',
    'supervisar',
    'coordinar',
    'desarrollar',
    'ejecutar',
    'realizar',
    'liderar',
    'contribuir',
    'colaborar',
    'adaptarse',
    'cumplir',
    'apoyar',
    'demostrar',
    'promover',
    'analizar',
    'organizar',
    'presentar',
    'comunicar',
    'planificar',
    'incluir',
    'exigir',
    'mostrar',
    'crear',
    'priorizar',
    'comprometido',
    'constante',
    'flexible',
    'innovador',
    'entusiasta',
    'proactivo',
    'disciplinado',
    'orientado',
    'objetivos',
    'trabajo en equipo',
    'proyectos',
    'responsabilidad',
    'desafíos',
    'iniciativa',
    'creatividad',
    'oportunidades',
    'ambiente',
    'exitoso',
    'resultados',
    'capacitación',
    'desarrollo',
    'crecimiento',
    'experiencia',
    'formación',
    'educación',
    'habilidades',
  ],
}

export const languagei18n: Record<SupportedLanguageKeys, PageText> = {
  EN: {
    search: {
      positionLabel: 'Position',
      positionPlaceholder: 'Software Engineer, DevOps, Data Scientist',
      positionError: 'Enter a valid job position.',

      locationLabel: 'Location',
      locationPlaceHolder: 'San Francisco, Berlin, Bangalore',
      locationError: 'Enter a valid location',

      skillsLabel: 'Skills',
      skillsPlaceHolder: 'Python, SQL, Cloud Computing',
      skillsError: 'Enter at least two skills separated by commas.',

      info: 'Enter a job title and keywords to see detailed charts and information about various roles.',
    },
    charts: {
      location: {
        title: 'Job Offers by Location',
        xTitle: 'Frequency',
        yTitle: 'Locations',
      },
      skills: {
        title: 'Job Offers by Skill',
        xTitle: 'Frequency',
        yTitle: 'Skills',
      },
      info: 'job offers have been read',
      average: 'The average monthly salary is: ',
      others: 'Others',
    },
    jobCard: {
      age: (ageString: string) => ['Published: ', `${ageString} ago`],
      location: ['Location', 'Unknown'],
      salary: ['Salary', 'Unknown'],
      showMore: 'Show more',
    },
    filters: {
      filterName: 'Filters: ',
      salaryAsc: 'Salary ⬆️',
      salaryDesc: 'Salary ⬇️',
    },
  },

  ES: {
    search: {
      positionLabel: 'Puesto',
      positionPlaceholder: 'Ingeniero de Software, DevOps, Científico de Datos',
      positionError: 'Ingrese un puesto de trabajo válido',

      locationLabel: 'Ubicación',
      locationPlaceHolder: 'Ciudad de México, Buenos Aires, Bogotá',
      locationError: 'Ingrese una ubicacion válida.',

      skillsLabel: 'Habilidades',
      skillsPlaceHolder: 'Python, SQL, Excel',
      skillsError: 'Ingrese al menos dos habilidades separadas por comas.',

      info: 'Introduzca un puesto de trabajo y palabras clave para ver gráficos detallados e información sobre las ofertas.',
    },
    charts: {
      location: {
        title: 'Ofertas de Trabajo por Ubicación',
        xTitle: 'Frecuencia',
        yTitle: 'Ubicaciones',
      },
      skills: {
        title: 'Ofertas de Trabajo por Habilidad',
        xTitle: 'Frecuencia',
        yTitle: 'Habilidades',
      },
      info: 'ofertas de trabajo han sido leidas',
      average: 'El salario promedio por mes es de: ',
      others: 'Otros',
    },
    jobCard: {
      age: (ageString: string) => ['Hace: ', `${ageString}`],
      location: ['Ubicación', 'Desconocida'],
      salary: ['Salario', 'Desconocido'],
      showMore: 'Ver más',
    },
    filters: {
      filterName: 'Filtros: ',
      salaryAsc: 'Salario ⬆️',
      salaryDesc: 'Salario ⬇️',
    },
  },
}

interface PageText {
  search: {
    positionLabel: string
    positionError: string
    positionPlaceholder: string

    skillsLabel: string
    skillsPlaceHolder: string
    skillsError: string

    locationLabel: string
    locationPlaceHolder: string
    locationError: string

    info: string
  }

  charts: {
    skills: ChartStrings
    location: ChartStrings
    info: string
    average: string
    others: string
  }

  jobCard: {
    age: (jobAge: string) => string[]
    salary: string[]
    location: string[]
    showMore: string
  }

  filters: {
    filterName: string
    salaryDesc: string
    salaryAsc: string
  }
}

interface ChartStrings {
  title: string
  yTitle: string
  xTitle: string
}
