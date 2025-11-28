import { useDispatch, useSelector } from "react-redux";
import type { AppDispatch } from "./index"; // 🔹 타입 전용
import type { RootState } from "./index";

export const useAppDispatch = useDispatch.withTypes<AppDispatch>();
export const useAppSelector = useSelector.withTypes<RootState>();
