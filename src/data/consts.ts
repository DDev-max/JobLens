import type { SupportedLanguageKeys } from '@/data/types'

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
  ES: [],
}

export const languagei18n: Record<SupportedLanguageKeys, PageText> = {
  EN: {
    search: {
      jobLabel: 'Position',
      jobPlaceHolder: 'Software Engineer, DevOps, Data Scientist',

      locationLabel: 'Location',
      locationPlaceHolder: 'San Francisco, Berlin, Bangalore',

      skillsLabel: 'Skills',
      skillsPlaceHolder: 'Python, SQL, Cloud Computing',

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
    },
    jobCard: {
      age: (ageString: string) => ['Published: ', `${ageString} ago`],
      location: ['Location', 'Unknown'],
      salary: ['Salary', 'Unknown'],
    },
  },

  ES: {
    search: {
      jobLabel: 'Puesto',
      jobPlaceHolder: 'Ingeniero de Software, DevOps, Científico de Datos',

      locationLabel: 'Ubicación',
      locationPlaceHolder: 'Ciudad de México, Buenos Aires, Bogotá',

      skillsLabel: 'Habilidades',
      skillsPlaceHolder: 'Python, SQL, Excel',

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
    },
    jobCard: {
      age: (ageString: string) => ['Publicado hace: ', `${ageString}`],
      location: ['Ubicación', 'Desconocida'],
      salary: ['Salario', 'Desconocido'],
    },
  },
}

interface PageText {
  search: {
    jobLabel: string
    jobPlaceHolder: string

    skillsLabel: string
    skillsPlaceHolder: string

    locationLabel: string
    locationPlaceHolder: string

    info: string
  }

  charts: {
    info: string
    skills: ChartStrings
    location: ChartStrings
  }

  jobCard: {
    age: (jobAge: string) => string[]
    salary: string[]
    location: string[]
  }
}

interface ChartStrings {
  title: string
  yTitle: string
  xTitle: string
}
