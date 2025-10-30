import { useDispatch, useSelector } from "react-redux";
import type { RootState, AppDispatch } from "./store"; // 🔹 타입 전용

export const useAppDispatch = useDispatch.withTypes<AppDispatch>();
export const useAppSelector = useSelector.withTypes<RootState>();
