import { useQuery, useMutation, useQueryClient } from "@tanstack/react-query";
import api from "../../services/api";

const fetchKelas = async () => {
  const res = await api.get("/kelas");
  return res.data;
};

export const useKelas = () => {
  return useQuery({
    queryKey: ["kelas"],
    queryFn: fetchKelas,
  });
};

export const useCreateKelas = () => {
  const qc = useQueryClient();

  return useMutation({
    mutationFn: (data) => api.post("/kelas", data),
    onSuccess: () => {
      qc.invalidateQueries({
        queryKey: ["kelas"],
      });
    },
  });
};

export const useUpdateKelas = () => {
  const qc = useQueryClient();

  return useMutation({
    mutationFn: ({ id, data }) => api.put(`/kelas/${id}`, data),

    onSuccess: () => {
      qc.invalidateQueries({
        queryKey: ["kelas"],
      });
    },
  });
};

export const useDeleteKelas = () => {
  const qc = useQueryClient();

  return useMutation({
    mutationFn: (id) => api.delete(`/kelas/${id}`),

    onSuccess: () => {
      qc.invalidateQueries({
        queryKey: ["kelas"],
      });
    },
  });
};
