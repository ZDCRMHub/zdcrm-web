import { APIAxios } from "@/utils/axios"
import { useQuery, useMutation, useQueryClient } from "@tanstack/react-query"


interface UpdateRolePermission {
  permission: string;
  roles: {
    role_id: number;
    status: boolean;
  }[];
}

const updatePermissionFn = async (data: UpdateRolePermission) => {
  const res = await APIAxios.post('/auth/update-permission/', data)
  return res.data
}

export const useUpdateRolePermission = () => {
  const queryClient = useQueryClient()
  return useMutation({
    mutationFn: updatePermissionFn,
    onSuccess: () => {
      queryClient.invalidateQueries({
        queryKey: ['getAllRoles']
      })
    },
  })
}

