import { response, Response } from "express";
import { Types } from "mongoose";
import { StringLang, StringLangs } from "../types/common";

export interface FQAType {
  q: StringLang;
  a: StringLangs;
}

export const checkId = (id: string) => {
  if (!Types.ObjectId.isValid(id)) throw Error("Invalid ID");
};
export const checkTextArEn = (name: StringLang, message: string) => {
  if (!name || !name.AR || !name.EN) throw Error(message);
};
export const checkArrayArEn = (stringArr: StringLangs, message: string) => {
  if (
    !stringArr ||
    !stringArr.AR ||
    !stringArr.EN ||
    stringArr.AR.length < 1 ||
    stringArr.EN.length < 1
  )
    throw Error(message);

  const maxArrayLength = [
    ...Array(Math.max(stringArr.AR.length, stringArr.EN.length)),
  ];

  maxArrayLength.forEach((_, i) => {
    if (!stringArr.AR[i] || !stringArr.EN[i]) throw Error(message);
  });
};

export const checkFQA = (fqaObj: FQAType[], message: string) => {
  if (!fqaObj || fqaObj.length < 1) throw Error(message);

  fqaObj.forEach((fqa) => {
    if (
      !fqa.q ||
      !fqa.a ||
      !fqa.q.AR ||
      !fqa.q.EN ||
      !fqa.a.AR ||
      !fqa.a.EN ||
      typeof fqa.a.AR !== "object" ||
      typeof fqa.a.EN !== "object" ||
      fqa.a.AR.length < 1 ||
      fqa.a.EN.length < 1
    ) {
      throw Error(message);
    }

    const maxArrayLength = [
      ...Array(Math.max(fqa.a.AR.length, fqa.a.EN.length)),
    ];

    maxArrayLength.forEach((_, i) => {
      if (!fqa.a.AR[i] || !fqa.a.EN[i]) throw Error(message);
    });
  });
};

export const checkNumber = (num: string | number, message: string) => {
  if (typeof num !== "number" || num <= 0) throw Error(message);
};
