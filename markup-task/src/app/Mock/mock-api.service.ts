import { Injectable } from '@angular/core';
import {Observable, of} from "rxjs";
import {ConsultationWith} from "../components/consultation-with/consultation-with.component";
import {ConsultationTypes} from "../components/choose-type/choose-type.component";

@Injectable({
  providedIn: 'root'
})
export class MockApiService {

  allCustomers: ICustomer[] =[
    {
      id: 1,
      name: 'გიორგი ახვლედიანი',
      nameEn: 'Giorgi Akhvlediani',
      identificationNumber: '11122233312',
      insuranceNumber: 'OPPMED 5029382/20',
      birthDate:'01/12/1999'
    },
    {
      id: 2,
      name: 'ბესარიონი გადელია',
      nameEn: 'Besarioni Gadelia',
      identificationNumber: '22211133321',
      insuranceNumber: 'OPPMED 5039482/21',
      birthDate:'12/04/2002'
    },
    {
      id: 3,
      name: 'ნიკა ახვლედიანი',
      nameEn: 'Giorgi Akhvlediani',
      identificationNumber: '11122233314',
      insuranceNumber: 'OPPMED 5029382/22',
      birthDate:'21/08/1989'
    },
    {
      id: 4,
      name: 'გიორგი ლომიძე',
      nameEn: 'giorgi lomidze',
      identificationNumber: '11111111111',
      insuranceNumber: 'OPPMED 5039482/23',
      birthDate:'01/01/2000'
    }
  ]

  customers: ICustomer[] = [
    {
      id: 1,
      name: 'გიორგი ახვლედიანი',
      nameEn: 'Giorgi Akhvlediani',
      identificationNumber: '11122233312',
      insuranceNumber: 'OPPMED 5029382/20',
      birthDate:'01/12/1999'
    },
    {
      id: 2,
      name: 'ბესარიონი გადელია',
      nameEn: 'Besarioni Gadelia',
      identificationNumber: '22211133321',
      insuranceNumber: 'OPPMED 5039482/21',
      birthDate:'12/04/2002'
    }
  ];

  hospitals: IHospital[] = [
    {
      id: 1,
      name: 'კურაციო',
      nameEn: 'Curatio',
      address: 'ოთარ ლორთქიფანიძის N31',
      addressEn: 'Otar Lortkipanidze street N31',
      city: 'tbilisi'
    },
    {
      id: 2,
      name: 'ინგოროყვას საუნივერსიტეტო კლინიკა',
      nameEn: 'Ingorokva university clinic',
      address: 'წინანდლის ქუჩა N9',
      addressEn: 'Tsinandali street N9',
      city: 'tbilisi'
    },
    {
      id: 3,
      name: 'სს “ევექსის ჰოსპიტლები” - მ.იაშვილის სახელობის ბავშვთა ცენტრალური საავადმოფო',
      nameEn: 'Evex - M. Iashvili Central Children\'s Hospital',
      address: 'ოთარ ლორთქიფანიძის N31',
      addressEn: 'Otar Lortkipanidze street N31',
      city: 'batumi'
    }
  ]

  doctors: IDoctor[] = [
    {
      id: 1,
      type: ConsultationWith.Specialist,
      name: 'ნინო ოქროპირიძე',
      nameEn: 'Nino Okropiridze',
      subtitle: 'otorhinolaryngologist',
      clinicId: 1,
      specialityId: 1,
      timeSlotsByDays: {
        '29': ['10:20 - 10:40', '11:00 - 11:20', '11:20 - 11:40', '12:20 - 12:40'],
        '30': ['10:20 - 10:40', '11:00 - 11:20', '11:20 - 11:40', '12:20 - 12:40', '13:00 - 13:20', '14:20 - 14:40'],
        '31': ['10:20 - 10:40', '11:00 - 11:20', '11:20 - 11:40', '12:20 - 12:40', '13:00 - 13:20', '14:20 - 14:40'],
        '1': ['10:20 - 10:40', '11:00 - 11:20', '11:20 - 11:40', '12:20 - 12:40'],
        '2': ['10:20 - 10:40', '11:00 - 11:20', '11:20 - 11:40', '12:20 - 12:40', '13:00 - 13:20', '14:20 - 14:40'],
        '3': ['10:20 - 10:40', '11:00 - 11:20', '11:20 - 11:40', '12:20 - 12:40'],
        '4': ['10:20 - 10:40', '11:00 - 11:20', '11:20 - 11:40', '12:20 - 12:40'],
        '8': ['10:20 - 10:40', '11:00 - 11:20', '11:20 - 11:40', '12:20 - 12:40', '13:00 - 13:20', '14:20 - 14:40']
      }
    },
    {
      id: 2,
      type: ConsultationWith.Specialist,
      name: 'გიორგი ოქროპირიძე',
      nameEn: 'Giorgi Okropiridze',
      subtitle: 'dermatologist',
      clinicId: 1,
      specialityId: 2,
      timeSlotsByDays: {
        '29': ['10:20 - 10:40', '11:00 - 11:20', '11:20 - 11:40', '12:20 - 12:40'],
        '30': ['10:20 - 10:40', '11:00 - 11:20', '11:20 - 11:40', '12:20 - 12:40', '13:00 - 13:20', '14:20 - 14:40'],
        '31': ['10:20 - 10:40', '11:00 - 11:20', '11:20 - 11:40', '12:20 - 12:40', '13:00 - 13:20', '14:20 - 14:40'],
        '1': ['10:20 - 10:40', '11:00 - 11:20', '11:20 - 11:40', '12:20 - 12:40'],
        '2': ['10:20 - 10:40', '11:00 - 11:20', '11:20 - 11:40', '12:20 - 12:40', '13:00 - 13:20', '14:20 - 14:40'],
        '3': ['10:20 - 10:40', '11:00 - 11:20', '11:20 - 11:40', '12:20 - 12:40'],
        '4': ['10:20 - 10:40', '11:00 - 11:20', '11:20 - 11:40', '12:20 - 12:40'],
        '8': ['10:20 - 10:40', '11:00 - 11:20', '11:20 - 11:40', '12:20 - 12:40', '13:00 - 13:20', '14:20 - 14:40']
      }
    },
    {
      id: 3,
      type: ConsultationWith.Private,
      name: 'ბესარიონი გადელია',
      nameEn: 'Besarioni Gadelia',
      subtitle: 'privateDoctor',
      clinicId: 1,
      timeSlotsByDays: {
        '29': ['10:20 - 10:40', '11:00 - 11:20', '11:20 - 11:40', '12:20 - 12:40'],
        '30': ['10:20 - 10:40', '11:00 - 11:20', '11:20 - 11:40', '12:20 - 12:40', '13:00 - 13:20', '14:20 - 14:40'],
        '31': ['10:20 - 10:40', '11:00 - 11:20', '11:20 - 11:40', '12:20 - 12:40', '13:00 - 13:20', '14:20 - 14:40'],
        '1': ['10:20 - 10:40', '11:00 - 11:20', '11:20 - 11:40', '12:20 - 12:40'],
        '2': ['10:20 - 10:40', '11:00 - 11:20', '11:20 - 11:40', '12:20 - 12:40', '13:00 - 13:20', '14:20 - 14:40'],
        '3': ['10:20 - 10:40', '11:00 - 11:20', '11:20 - 11:40', '12:20 - 12:40'],
        '4': ['10:20 - 10:40', '11:00 - 11:20', '11:20 - 11:40', '12:20 - 12:40'],
        '8': ['10:20 - 10:40', '11:00 - 11:20', '11:20 - 11:40', '12:20 - 12:40', '13:00 - 13:20', '14:20 - 14:40']
      }
    },
    {
      id: 4,
      type: ConsultationWith.Machinery,
      name: 'ნინო ოქროპირიძე',
      nameEn: 'Nino Okropiridze',
      subtitle: 'researchDoctor',
      clinicId: 3,
      researchId: 1,
      timeSlotsByDays: {
        '29': ['10:20 - 10:40', '11:00 - 11:20', '11:20 - 11:40', '12:20 - 12:40'],
        '30': ['10:20 - 10:40', '11:00 - 11:20', '11:20 - 11:40', '12:20 - 12:40', '13:00 - 13:20', '14:20 - 14:40'],
        '31': ['10:20 - 10:40', '11:00 - 11:20', '11:20 - 11:40', '12:20 - 12:40', '13:00 - 13:20', '14:20 - 14:40'],
        '1': ['10:20 - 10:40', '11:00 - 11:20', '11:20 - 11:40', '12:20 - 12:40'],
        '2': ['10:20 - 10:40', '11:00 - 11:20', '11:20 - 11:40', '12:20 - 12:40', '13:00 - 13:20', '14:20 - 14:40'],
        '3': ['10:20 - 10:40', '11:00 - 11:20', '11:20 - 11:40', '12:20 - 12:40'],
        '4': ['10:20 - 10:40', '11:00 - 11:20', '11:20 - 11:40', '12:20 - 12:40'],
        '8': ['10:20 - 10:40', '11:00 - 11:20', '11:20 - 11:40', '12:20 - 12:40', '13:00 - 13:20', '14:20 - 14:40']
      }
    },
    {
      id: 5,
      type: ConsultationWith.Machinery,
      name: 'გიორგი ოქროპირიძე',
      nameEn: 'Giorgi Okropiridze',
      subtitle: 'researchDoctor',
      clinicId: 1,
      researchId: 2,
      timeSlotsByDays: {
        '29': ['10:20 - 10:40', '11:00 - 11:20', '11:20 - 11:40', '12:20 - 12:40'],
        '30': ['10:20 - 10:40', '11:00 - 11:20', '11:20 - 11:40', '12:20 - 12:40', '13:00 - 13:20', '14:20 - 14:40'],
        '31': ['10:20 - 10:40', '11:00 - 11:20', '11:20 - 11:40', '12:20 - 12:40', '13:00 - 13:20', '14:20 - 14:40'],
        '1': ['10:20 - 10:40', '11:00 - 11:20', '11:20 - 11:40', '12:20 - 12:40'],
        '2': ['10:20 - 10:40', '11:00 - 11:20', '11:20 - 11:40', '12:20 - 12:40', '13:00 - 13:20', '14:20 - 14:40'],
        '3': ['10:20 - 10:40', '11:00 - 11:20', '11:20 - 11:40', '12:20 - 12:40'],
        '4': ['10:20 - 10:40', '11:00 - 11:20', '11:20 - 11:40', '12:20 - 12:40'],
        '8': ['10:20 - 10:40', '11:00 - 11:20', '11:20 - 11:40', '12:20 - 12:40', '13:00 - 13:20', '14:20 - 14:40']
      }
    },
  ];


  constructor() { }

  getCustomers() {
    return of(this.customers);
  }

  getAllCustomers() {
    return of(this.allCustomers);
  }

  getHospitals(query: {city: string, name: string}) {
    let hospitals = this.hospitals;
    if (query.city) {
      hospitals = hospitals.filter(val => val.city.toLowerCase() === query.city.toLowerCase());
    }

    if (query.name) {
      hospitals = hospitals.filter(val => val.name.toLowerCase().includes(query.name.toLowerCase()) ||
      val.nameEn.toLowerCase().includes(query.name.toLowerCase()));
    }

    return of(hospitals);
  }

  getDoctors() {
    return of(this.doctors);
  }
}


export interface ICustomer {
  id: number,
  name: string,
  nameEn: string,
  identificationNumber: string;
  insuranceNumber: string;
  birthDate: string;
}

export interface IHospital {
  id: number;
  name: string;
  nameEn: string;
  address: string;
  addressEn: string;
  city: string;
}

export interface IDoctor {
  id: number,
  type: ConsultationWith,
  name: string,
  nameEn: string,
  timeSlotsByDays: any,
  subtitle: string,
  clinicId: number,
  researchId?: number,
  specialityId?: number
}

export interface ISpecialization {
  id: number,
  name: string,
}

export interface IResearch {
  id: number,
  name: string
}
