import { useQuery, useMutation, useQueryClient } from "@tanstack/react-query";
import api from "../../services/api";

// =====================
// GET DOSEN
// =====================
const fetchDosen = async () => {
  const res = await api.get("/dosen");
  return res.data;
};

export const useDosen = () => {
  return useQuery({
    queryKey: ["dosen"],
    queryFn: fetchDosen,
  });
};

// =====================
// CREATE
// =====================
export const useCreateDosen = () => {
  const qc = useQueryClient();

  return useMutation({
    mutationFn: (data) => api.post("/dosen", data),
    onSuccess: () => qc.invalidateQueries({ queryKey: ["dosen"] }),
  });
};

// =====================
// UPDATE
// =====================
export const useUpdateDosen = () => {
  const qc = useQueryClient();

  return useMutation({
    mutationFn: (data) => api.put(`/dosen/${data.id}`, data),
    onSuccess: () => qc.invalidateQueries({ queryKey: ["dosen"] }),
  });
};

// =====================
// DELETE
// =====================
export const useDeleteDosen = () => {
  const qc = useQueryClient();

  return useMutation({
    mutationFn: (id) => api.delete(`/dosen/${id}`),
    onSuccess: () => qc.invalidateQueries({ queryKey: ["dosen"] }),
  });
};
