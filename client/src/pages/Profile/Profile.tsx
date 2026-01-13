"use client";

import { useSelector } from "react-redux";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";

const Profile = () => {
  const { user } = useSelector((state: any) => state.auth);

  if (!user) return null;

  return (
    <div className="mx-auto max-w-4xl space-y-8">
      {/* HEADER */}
      <div>
        <h1 className="text-3xl font-bold">My Profile</h1>
        <p className="text-muted-foreground">
          View and manage your account details
        </p>
      </div>

      {/* BASIC INFO */}
      <Card>
        <CardHeader className="flex flex-row items-center justify-between">
          <CardTitle>Basic Information</CardTitle>
        </CardHeader>

        <CardContent className="space-y-4">
          <div>
            <p className="text-sm text-muted-foreground">Name</p>
            <p className="font-medium">{user.name}</p>
          </div>

          <div>
            <p className="text-sm text-muted-foreground">Email</p>
            <p className="font-medium">{user.email}</p>
          </div>

          <div>
            <p className="text-sm text-muted-foreground">Role</p>
            <Badge className="capitalize">{user.role}</Badge>
          </div>
        </CardContent>
      </Card>
    </div>
  );
};

export default Profile;
