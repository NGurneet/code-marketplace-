
// import { Card, CardContent, Avatar, Typography, Button, CircularProgress } from '@mui/material';
// import EditIcon from '@mui/icons-material/Edit';
// import { useState } from 'react';
// import { useNavigate } from 'react-router-dom';
// import { useSelector } from "react-redux";
// import { useGetUserDataQuery } from "../../services/apiSlice";

// const UserProfile = () => {
//   const navigate = useNavigate();

//   // Get the user data from localStorage and parse it
//    const userData = localStorage.getItem("user");
//   // const userData = useGetUserDataQuery(user.id);
//    const user = userData ? JSON.parse(userData) : null;
//     const userId = user.id
//   const [isEditing, setIsEditing] = useState(false);

//   if (!user) {
//     return <Typography color="error" sx={{ textAlign: 'center', mt: 4 }}>User data not available.</Typography>;
//   }

//   return (
//     <Card sx={{ maxWidth: 400, mx: 'auto', mt: 4, p: 2, textAlign: 'center' }}>
//       <Avatar
//         src={user.avatar || '/assets/default-avatar.png'} // Use default avatar if not available
//         alt={user.name || 'User'}
//         sx={{ width: 80, height: 80, mx: 'auto', mb: 2 }}
//       />
//       <CardContent>
//         <Typography variant="h5">{user.name || 'User Name'}</Typography>
//         <Typography variant="body2" color="textSecondary">{user.email || 'user@example.com'}</Typography>

//         <Button
//           startIcon={<EditIcon />}
//           variant="contained"
//           color="primary"
//           sx={{ mt: 2 }}
//           onClick={() => setIsEditing(true)}
//         >
//           Edit Profile
//         </Button>
//       </CardContent>
//     </Card>
//   );
// };

// export default UserProfile;

import { useSelector } from "react-redux";
import { RootState } from "../../redux/store";
import { useGetUserDataQuery } from "../../services/apiSlice";
import { Card, CardContent, Avatar, Typography, Button, CircularProgress } from "@mui/material";
import EditIcon from "@mui/icons-material/Edit";
import { useState } from "react";

const UserProfile = () => {
  const [isEditing, setIsEditing] = useState(false);

//   // ✅ Get `userId` from Redux store
    const userId = localStorage.getItem("id");
  
  // const userData = useGetUserDataQuery(user.id);
    
    // const userId = useSelector((state: RootState) => state.auth.user.id);
  console.log(userId);
  // ✅ Fetch user data only if `userId` exists
  const { data: user, isLoading, error } = useGetUserDataQuery(userId!, {
    skip: !userId,
  });

  if (isLoading) return <CircularProgress sx={{ display: "block", mx: "auto", mt: 4 }} />;
  if (error || !user) return <Typography color="error" sx={{ textAlign: "center", mt: 4 }}>Failed to load user data.</Typography>;

  return (
    <Card sx={{ maxWidth: 400, mx: "auto", mt: 4, p: 2, textAlign: "center" }}>
      <Avatar src={user.avatar || "/assets/default-avatar.png"} alt={user.name || "User"} sx={{ width: 80, height: 80, mx: "auto", mb: 2 }} />
      <CardContent>
        <Typography variant="h5">{user.name || "User Name"}</Typography>
        <Typography variant="body2" color="textSecondary">{user.email || "user@example.com"}</Typography>

        <Button startIcon={<EditIcon />} variant="contained" color="primary" sx={{ mt: 2 }} onClick={() => setIsEditing(true)}>
          Edit Profile
        </Button>
      </CardContent>
    </Card>
  );
};

export default UserProfile;
