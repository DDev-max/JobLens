import type { SupportedLanguageKeys } from '#shared/types.ts'

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
    loading: {
      firstMsg: string
      secondMsg: string
      thirdMsg: string
    }
    error: string
    notFound: string
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

export const languagei18n: Record<SupportedLanguageKeys, PageText> = {
  EN: {
    search: {
      positionLabel: 'Position',
      positionPlaceholder: 'Software Engineer, DevOps, Data Scientist',
      positionError: 'Enter a valid job position.',

      locationLabel: 'Location',
      locationPlaceHolder: 'San Francisco, Berlin, Bengaluru',
      locationError: 'Enter a valid location.',

      skillsLabel: 'Skills',
      skillsPlaceHolder: 'Python, SQL, Cloud Computing',
      skillsError: 'Enter at least two skills separated by commas.',

      info: 'Enter a job title and keywords to see detailed charts and information about various roles.',
      loading: {
        firstMsg: 'Finding the best locations...',
        secondMsg: 'Reading the job pages...',
        thirdMsg: 'Charting the offers...',
      },
      error: 'An unexpected error occurred',
      notFound: 'No results found. Try other filters or a different search.',
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
      age: (ageString: string) => ['Posted: ', `${ageString} ago`],
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
      positionError: 'Ingrese un puesto de trabajo válido.',

      locationLabel: 'Ubicación',
      locationPlaceHolder: 'Ciudad de México, Buenos Aires, Bogotá',
      locationError: 'Ingrese una ubicación válida.',

      skillsLabel: 'Habilidades',
      skillsPlaceHolder: 'Python, SQL, Excel',
      skillsError: 'Ingrese al menos dos habilidades separadas por comas.',

      info: 'Introduzca un puesto de trabajo y palabras clave para ver gráficos detallados e información sobre las ofertas.',
      loading: {
        firstMsg: 'Buscando las mejores ubicaciones...',
        secondMsg: 'Leyendo las páginas de trabajo...',
        thirdMsg: 'Graficando las ofertas...',
      },
      error: 'Ha ocurrido un error',
      notFound: 'No se encontraron resultados. Intente con otros filtros o realice otra búsqueda.',
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
      info: 'ofertas de trabajo han sido leídas.',
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
