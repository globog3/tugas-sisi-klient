import { useQuery, useMutation, useQueryClient } from "@tanstack/react-query";

import api from "../../services/api";

// =====================
// GET ALL
// =====================
const fetchMataKuliah = async () => {
  const res = await api.get("/matakuliah");
  return res.data;
};

export const useMataKuliah = () => {
  return useQuery({
    queryKey: ["matakuliah"],
    queryFn: fetchMataKuliah,
  });
};

// =====================
// CREATE
// =====================
export const useCreateMataKuliah = () => {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: async (data) => {
      const res = await api.post("/matakuliah", data);
      return res.data;
    },

    onSuccess: () => {
      queryClient.invalidateQueries({
        queryKey: ["matakuliah"],
      });
    },
  });
};

// =====================
// UPDATE
// =====================
export const useUpdateMataKuliah = () => {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: async ({ id, data }) => {
      const res = await api.put(`/matakuliah/${id}`, data);

      return res.data;
    },

    onSuccess: () => {
      queryClient.invalidateQueries({
        queryKey: ["matakuliah"],
      });
    },
  });
};

// =====================
// DELETE
// =====================
export const useDeleteMataKuliah = () => {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: async (id) => {
      const res = await api.delete(`/matakuliah/${id}`);

      return res.data;
    },

    onSuccess: () => {
      queryClient.invalidateQueries({
        queryKey: ["matakuliah"],
      });
    },
  });
};
