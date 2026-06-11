import { useQuery, useMutation, useQueryClient } from "@tanstack/react-query";
import api from "../../services/api";

// =====================
const fetchMK = async () => {
  const res = await api.get("/matakuliah");
  return res.data;
};

export const useMataKuliah = () => {
  return useQuery({
    queryKey: ["matakuliah"],
    queryFn: fetchMK,
  });
};

// =====================
export const useCreateMK = () => {
  const qc = useQueryClient();

  return useMutation({
    mutationFn: (data) => api.post("/matakuliah", data),
    onSuccess: () => qc.invalidateQueries({ queryKey: ["matakuliah"] }),
  });
};

export const useUpdateMK = () => {
  const qc = useQueryClient();

  return useMutation({
    mutationFn: (data) => api.put(`/matakuliah/${data.id}`, data),
    onSuccess: () => qc.invalidateQueries({ queryKey: ["matakuliah"] }),
  });
};

export const useDeleteMK = () => {
  const qc = useQueryClient();

  return useMutation({
    mutationFn: (id) => api.delete(`/matakuliah/${id}`),
    onSuccess: () => qc.invalidateQueries({ queryKey: ["matakuliah"] }),
  });
};
