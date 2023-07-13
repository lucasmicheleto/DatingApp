export interface Member {
    id: number
    userName: string
    age: number
    knownAs: string
    created: string
    lastActive: string
    introduction: string
    lookingFor: string
    interests: string
    city: string
    country: string
    photoUrl: string
    photos: Photo[]
  }
  
  export interface Photo {
    id: number
    url: string
    isMain: boolean
  }
  