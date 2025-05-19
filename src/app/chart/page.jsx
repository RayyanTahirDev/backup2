"use client";

import { useSelector, useDispatch } from "react-redux";
import { useEffect, useState } from "react";
import { useRouter } from "next/navigation";
import Link from "next/link";
import { getOrganization } from "@/redux/action/org";
import { Button } from "@/components/ui/button";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Card, CardHeader, CardTitle, CardContent, CardFooter } from "@/components/ui/card";
import { ChevronDown, ChevronUp, Plus, User, FolderTree, Users, RotateCcw } from "lucide-react";
import Cookies from "js-cookie";
import { logoutSuccess } from "@/redux/reducer/userReducer";
import axios from "axios";

export default function ChartPage() {
  const dispatch = useDispatch();
  const router = useRouter();

  const { isAuth } = useSelector((state) => state.user);
  const { organization } = useSelector((state) => state.organization);

  const [departments, setDepartments] = useState([]);
  const [teammembers, setTeammembers] = useState([]);
  const [collapsed, setCollapsed] = useState(false);
  const [deptCollapsed, setDeptCollapsed] = useState({});

  useEffect(() => {
    if (!isAuth) {
      router.replace("/login");
    }
  }, [isAuth, router]);

  useEffect(() => {
    if (isAuth && !organization) {
      dispatch(getOrganization());
    }
  }, [isAuth, organization, dispatch]);

  // Fetch departments
  useEffect(() => {
    const fetchDepartments = async () => {
      if (!organization) return;
      try {
        const token = Cookies.get("token");
        const { data } = await axios.get(
          `/api/departments?organizationId=${organization._id}`,
          {
            headers: { Authorization: `Bearer ${token}` },
          }
        );
        setDepartments(data);
        setDeptCollapsed(
          data.reduce((acc, d) => ({ ...acc, [d._id]: false }), {})
        );
      } catch (err) {
        setDepartments([]);
      }
    };
    if (organization) fetchDepartments();
  }, [organization]);

  // Fetch only invited team members
  useEffect(() => {
    const fetchTeamMembers = async () => {
      if (!organization) return;
      try {
        const token = Cookies.get("token");
        const { data } = await axios.get("/api/teammembers", {
          headers: { Authorization: `Bearer ${token}` },
        });
        setTeammembers(data.filter((tm) => tm.invited));
      } catch (err) {
        setTeammembers([]);
      }
    };
    if (organization) fetchTeamMembers();
  }, [organization]);

  const logoutHandler = () => {
    Cookies.remove("token", { path: "/" });
    dispatch(logoutSuccess());
    router.push("/login");
  };

  const getInitials = (name) => {
    return name
      .split(" ")
      .map((part) => part.charAt(0))
      .join("")
      .toUpperCase();
  };

  if (!isAuth) return null;

  return (
    <div className="w-full">
      <div className="w-full max-w-7xl my-6 flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4">
        <h1 className="text-2xl sm:text-3xl font-bold px-8 ml-50">Organizational Chart</h1>
        <div className="flex flex-wrap items-center gap-2">
          <Button
            onClick={() => setCollapsed(!collapsed)}
            variant="outline"
            className="flex items-center gap-2"
            size="sm"
          >
            {collapsed ? (
              <>
                <FolderTree className="h-4 w-4" />
                <span className="hidden sm:inline">Expand All</span>
              </>
            ) : (
              <>
                <Users className="h-4 w-4" />
                <span className="hidden sm:inline">Collapse All</span>
              </>
            )}
          </Button>
          <Link href="/invite">
            <Button variant="outline" className="flex items-center gap-2" size="sm">
              <Plus className="h-4 w-4" />
              <span className="hidden sm:inline">Add Team Member</span>
            </Button>
          </Link>
          <Button variant="destructive" size="sm" onClick={logoutHandler}>
            Logout
          </Button>
        </div>
      </div>

      {organization ? (
        <div className="flex flex-col items-center w-full">
          {/* Organization (CEO) Card */}
          <div className="flex flex-col items-center">
            <Card className="w-64 sm:w-72">
              <CardHeader className="py-4 pb-2">
                <Button
                  variant="ghost"
                  className="p-0 h-auto w-full flex justify-between items-center mb-2 text-left"
                  onClick={() => router.push(`/organization/ceo/${organization._id}`)}
                >
                  <div className="flex items-center gap-2">
                    <Avatar className="h-8 w-8">
                      <AvatarImage src={organization.ceoPic} />
                      <AvatarFallback>{getInitials(organization.ceoName)}</AvatarFallback>
                    </Avatar>
                    <CardTitle className="text-sm sm:text-base font-medium">
                      {organization.ceoName}
                    </CardTitle>
                  </div>
                  <User size={16} className="text-muted-foreground" />
                </Button>
              </CardHeader>
              <CardContent className="pt-0 pb-2">
                <div className="space-y-1">
                  <p className="text-xs sm:text-sm font-medium">CEO</p>
                  <p className="text-xs text-muted-foreground">{organization.industry}</p>
                  <p className="text-xs truncate">{organization.email}</p>
                </div>
              </CardContent>
              <CardFooter className="flex justify-between pt-0 pb-3">
                <Button
                  variant="outline"
                  size="sm"
                  className="text-xs h-7 sm:h-8"
                  onClick={() => setCollapsed(!collapsed)}
                >
                  {collapsed ? (
                    <>
                      <ChevronDown className="h-3.5 w-3.5 mr-1" />
                      <span className="hidden sm:inline">Expand</span>
                    </>
                  ) : (
                    <>
                      <ChevronUp className="h-3.5 w-3.5 mr-1" />
                      <span className="hidden sm:inline">Collapse</span>
                    </>
                  )}
                </Button>
                <Link href="/departments">
                  <Button variant="secondary" size="sm" className="text-xs h-7 sm:h-8">
                    <Plus className="h-3.5 w-3.5" />
                    <span className="hidden sm:inline ml-1">Add</span>
                  </Button>
                </Link>
              </CardFooter>
            </Card>

            {/* Vertical line from CEO to departments */}
            {!collapsed && departments.length > 0 && (
              <div className="w-0.5 h-8 bg-border/70" />
            )}
          </div>

          {/* Departments */}
          {!collapsed && departments.length > 0 && (
            <div className="flex flex-wrap justify-center gap-4 md:gap-8 relative px-2 md:px-0">
              {departments.map((department) => (
                <div key={department._id} className="flex flex-col items-center">
                  {/* Vertical line from CEO to department */}
                  <div className="w-0.5 h-5 bg-border/70" />

                  {/* Department Card */}
                  <div className="flex flex-col items-center">
                    <Card className="w-64 sm:w-72">
                      <CardHeader className="py-4 pb-2">
                        <Button
                          variant="ghost"
                          className="p-0 h-auto w-full flex justify-between items-center mb-2 text-left"
                          onClick={() => router.push(`/departments/hod/${department._id}`)}
                        >
                          <div className="flex items-center gap-2">
                            <Avatar className="h-8 w-8">
                              <AvatarImage src={department.hodPic} />
                              <AvatarFallback>{getInitials(department.hodName)}</AvatarFallback>
                            </Avatar>
                            <CardTitle className="text-sm sm:text-base font-medium">
                              {department.hodName}
                            </CardTitle>
                          </div>
                          <User size={16} className="text-muted-foreground" />
                        </Button>
                      </CardHeader>
                      <CardContent className="pt-0 pb-2">
                        <div className="space-y-1">
                          <p className="text-xs sm:text-sm font-medium">{department.role}</p>
                          <p className="text-xs text-muted-foreground">{department.departmentName}</p>
                          <p className="text-xs truncate">{department.hodEmail}</p>
                        </div>
                      </CardContent>
                      <CardFooter className="flex justify-between pt-0 pb-3">
                        <Button
                          variant="outline"
                          size="sm"
                          className="text-xs h-7 sm:h-8"
                          onClick={() =>
                            setDeptCollapsed((prev) => ({
                              ...prev,
                              [department._id]: !prev[department._id],
                            }))
                          }
                        >
                          {deptCollapsed[department._id] ? (
                            <>
                              <ChevronDown className="h-3.5 w-3.5 mr-1" />
                              <span className="hidden sm:inline">Expand</span>
                            </>
                          ) : (
                            <>
                              <ChevronUp className="h-3.5 w-3.5 mr-1" />
                              <span className="hidden sm:inline">Collapse</span>
                            </>
                          )}
                        </Button>
                        <Link href="/departments">
                          <Button variant="secondary" size="sm" className="text-xs h-7 sm:h-8">
                            <Plus className="h-3.5 w-3.5" />
                            <span className="hidden sm:inline ml-1">Add</span>
                          </Button>
                        </Link>
                      </CardFooter>
                    </Card>

                    {/* Vertical line from department to subfunctions */}
                    {department.subfunctions?.length > 0 && !deptCollapsed[department._id] && (
                      <div className="w-0.5 h-8 bg-border/70" />
                    )}
                  </div>

                  {/* Subfunctions */}
                  {department.subfunctions?.length > 0 && !deptCollapsed[department._id] && (
                    <div className="flex flex-wrap justify-center gap-4 md:gap-8">
                      {department.subfunctions.map((subfunction, idx) => {
                        const teamLead = teammembers.find(
                          (tm) =>
                            tm.department === department._id &&
                            tm.subfunctionIndex === idx &&
                            tm.role === "Team Lead"
                        );
                        const teamMembers = teammembers.filter(
                          (tm) =>
                            tm.department === department._id &&
                            tm.subfunctionIndex === idx &&
                            tm.role === "Team Member"
                        );

                        return (
                          <div key={idx} className="flex flex-col items-center">
                            {/* Vertical line from department to subfunction */}
                            <div className="w-0.5 h-5 bg-border/70" />

                            {/* Subfunction Card */}
                            <Card className="w-56 sm:w-64">
                              <CardHeader className="py-3 pb-1">
                                <CardTitle className="text-sm sm:text-base font-medium text-center">
                                  {subfunction.name}
                                </CardTitle>
                              </CardHeader>
                              <CardFooter className="flex justify-center pt-0 pb-2">
                                <Link href="/departments">
                                  <Button variant="secondary" size="sm" className="text-xs h-7 sm:h-8">
                                    <Plus className="h-3.5 w-3.5" />
                                    <span className="hidden sm:inline ml-1">Add</span>
                                  </Button>
                                </Link>
                              </CardFooter>
                            </Card>

                            {/* Vertical line from subfunction to team lead */}
                            {teamLead && (
                              <div className="w-0.5 h-8 bg-border/70" />
                            )}

                            {/* Team Lead */}
                            {teamLead && (
                              <div className="flex flex-col items-center">
                                <Card className="w-56 sm:w-64">
                                  <CardHeader className="py-3 pb-1">
                                    <Button
                                      variant="ghost"
                                      className="p-0 h-auto w-full flex justify-between items-center mb-1 text-left"
                                      onClick={() => router.push(`/teammembers/${teamLead._id}`)}
                                    >
                                      <div className="flex items-center gap-2">
                                        <Avatar className="h-7 w-7">
                                          <AvatarImage src={teamLead.profilePic} />
                                          <AvatarFallback>{getInitials(teamLead.name)}</AvatarFallback>
                                        </Avatar>
                                        <CardTitle className="text-xs sm:text-sm font-medium">
                                          {teamLead.name}
                                        </CardTitle>
                                      </div>
                                      <User size={14} className="text-muted-foreground" />
                                    </Button>
                                  </CardHeader>
                                  <CardContent className="pt-0 pb-1">
                                    <p className="text-xs text-muted-foreground">Team Lead</p>
                                  </CardContent>
                                </Card>

                                {/* Vertical line from team lead to team members */}
                                {teamMembers.length > 0 && (
                                  <div className="w-0.5 h-8 bg-border/70" />
                                )}
                              </div>
                            )}

                            {/* Team Members */}
                            {teamMembers.length > 0 && (
                              <div className="flex flex-wrap justify-center gap-3">
                                {teamMembers.map((member) => (
                                  <div key={member._id} className="flex flex-col items-center">
                                    {/* Diagonal line from team lead to member */}
                                    <div className="w-0.5 h-5 bg-border/70" />

                                    <Card className="w-48 sm:w-56">
                                      <CardHeader className="py-2 pb-0">
                                        <Button
                                          variant="ghost"
                                          className="p-0 h-auto w-full flex justify-between items-center text-left"
                                          onClick={() => router.push(`/teammembers/${member._id}`)}
                                        >
                                          <div className="flex items-center gap-2">
                                            <Avatar className="h-6 w-6">
                                              <AvatarImage src={member.profilePic} />
                                              <AvatarFallback>{getInitials(member.name)}</AvatarFallback>
                                            </Avatar>
                                            <CardTitle className="text-xs font-medium">
                                              {member.name}
                                            </CardTitle>
                                          </div>
                                          <User size={12} className="text-muted-foreground" />
                                        </Button>
                                      </CardHeader>
                                      <CardContent className="pt-0">
                                        <p className="text-xs text-muted-foreground">Team Member</p>
                                      </CardContent>
                                    </Card>
                                  </div>
                                ))}
                              </div>
                            )}
                          </div>
                        );
                      })}
                    </div>
                  )}
                </div>
              ))}
            </div>
          )}
        </div>
      ) : (
        <div className="w-full flex flex-col items-center py-12">
          <p className="text-center text-muted-foreground max-w-md mx-auto">
            No organization chart available. Please create a new chart.
          </p>
          <Link href="/organization" className="mt-4">
            <Button variant="outline" className="flex items-center gap-2">
              <Plus className="h-4 w-4" />
              Create New Chart
            </Button>
          </Link>
        </div>
      )}
    </div>
  );
}