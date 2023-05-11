import { response, Response } from "express";
import { Types } from "mongoose";
import { StringLang, StringLangs } from "../types/common";
import { deleteObject, ref } from "firebase/storage";
import storage from "../config/firebaseStorageTest.js";
import type { CourseType } from "../types/course";
import type { DiplomaType } from "../types/diploma";

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

const deleteImage = async (fileName: string) => {
  try {
    if (!fileName) return null;

    const storageRef = ref(storage, fileName);
    await deleteObject(storageRef);
  } catch (err) {
    console.log(err);
  }
};

export const deleteTechImages = async (
  data: any,
  type: "Course" | "Diploma"
) => {
  const { main_img, other_src } = data;
  let imgs = [main_img, other_src];
  if (type === "Course") {
    const newData = data as CourseType;
    const objectivesImg = newData?.objectives?.map((obj) => obj.icon);
    imgs = [...imgs, ...(objectivesImg || []), data.icon];
  }
  console.log(imgs);
  const promises = imgs.map(async (ele) => await deleteImage(ele));
  return await Promise.all(promises);
};
