import { useMe, useUpdateProfile } from "../../contexts/auth/auth.hook";
import ProfileForm, { ISubmitData } from "../components/ProfileForm";

function ProfileFormContainer() {
  const { data: user, isPending, isError, error } = useMe();
  const updateProfile = useUpdateProfile();

  const handleSaveSubmit = (data: ISubmitData) => {
    if (updateProfile.isPending) return;
    updateProfile.mutate(data);
  };
  // assign loading react Suspense
  if (isPending) return <div>Loading...</div>;
  if (isError) throw error;

  return <ProfileForm userInfo={user} onSaveSubmit={handleSaveSubmit} />;
}

export interface IProfilePageLoaderProps {}

export default ProfileFormContainer;
