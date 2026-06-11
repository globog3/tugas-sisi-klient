import { useQuery, useMutation, useQueryClient } from "@tanstack/react-query";
import api from "../../services/api";

// =========================
// GET
// =========================
const fetchMahasiswa = async () => {
  const res = await api.get("/mahasiswa");
  return res.data;
};

export const useMahasiswa = () => {
  return useQuery({
    queryKey: ["mahasiswa"],
    queryFn: fetchMahasiswa,
  });
};

// =========================
// CREATE
// =========================
export const useCreateMahasiswa = () => {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: (data) => api.post("/mahasiswa", data),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["mahasiswa"] });
    },
  });
};

// =========================
// UPDATE
// =========================
export const useUpdateMahasiswa = () => {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: (data) => api.put(`/mahasiswa/${data.id}`, data),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["mahasiswa"] });
    },
  });
};

// =========================
// DELETE
// =========================
export const useDeleteMahasiswa = () => {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: (id) => api.delete(`/mahasiswa/${id}`),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["mahasiswa"] });
    },
  });
};
