
import * as React from "react";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table";
import { useAuth } from "@/hooks/use-auth";
import { Button } from "@/components/ui/button";
import { formatDate, formatTime } from "@/lib/date-utils";
import { useIsMobile } from "@/hooks/use-mobile";
import { EditMatchControl } from "@/components/EditMatchControl";
import { useNavigate } from "react-router-dom";

// Mock data for demonstration
const groupsData = [
  {
    id: 1,
    name: "المجموعة الاولى",
    teams: [
      { id: 1, name: "فريق أ", played: 3, won: 2, drawn: 1, lost: 0, goalsFor: 7, goalsAgainst: 2, points: 7 },
      { id: 2, name: "فريق ب", played: 3, won: 2, drawn: 0, lost: 1, goalsFor: 5, goalsAgainst: 3, points: 6 },
      { id: 3, name: "فريق ج", played: 3, won: 1, drawn: 1, lost: 1, goalsFor: 4, goalsAgainst: 4, points: 4 },
      { id: 4, name: "فريق د", played: 3, won: 0, drawn: 0, lost: 3, goalsFor: 2, goalsAgainst: 9, points: 0 }
    ]
  },
  {
    id: 2,
    name: "المجموعة الثانية",
    teams: [
      { id: 5, name: "فريق هـ", played: 3, won: 3, drawn: 0, lost: 0, goalsFor: 8, goalsAgainst: 2, points: 9 },
      { id: 6, name: "فريق و", played: 3, won: 1, drawn: 1, lost: 1, goalsFor: 5, goalsAgainst: 4, points: 4 },
      { id: 7, name: "فريق ز", played: 3, won: 1, drawn: 0, lost: 2, goalsFor: 3, goalsAgainst: 5, points: 3 },
      { id: 8, name: "فريق ح", played: 3, won: 0, drawn: 1, lost: 2, goalsFor: 2, goalsAgainst: 7, points: 1 }
    ]
  }
];

const matchesData = [
  { id: 1, homeTeam: "فريق أ", awayTeam: "فريق ب", date: "2025-04-01T18:00:00", homeGoals: 2, awayGoals: 1, played: true },
  { id: 2, homeTeam: "فريق ج", awayTeam: "فريق د", date: "2025-04-01T20:30:00", homeGoals: 3, awayGoals: 1, played: true },
  { id: 3, homeTeam: "فريق هـ", awayTeam: "فريق و", date: "2025-04-02T19:00:00", homeGoals: 2, awayGoals: 2, played: true },
  { id: 4, homeTeam: "فريق أ", awayTeam: "فريق ج", date: "2025-04-03T18:30:00", homeGoals: null, awayGoals: null, played: false },
  { id: 5, homeTeam: "فريق ب", awayTeam: "فريق د", date: "2025-04-03T21:00:00", homeGoals: null, awayGoals: null, played: false }
];

const Index = () => {
  const [matches, setMatches] = React.useState(matchesData);
  const { isAdmin, logout } = useAuth();
  const navigate = useNavigate();
  const isMobile = useIsMobile();

  const handleEditMatch = (matchId: number, homeGoals: number, awayGoals: number) => {
    setMatches(prevMatches => 
      prevMatches.map(match => 
        match.id === matchId 
          ? { ...match, homeGoals, awayGoals, played: true }
          : match
      )
    );
  };

  const handleLoginClick = () => {
    navigate("/admin");
  };

  return (
    <div className="min-h-screen bg-gray-100 p-4">
      <div className="max-w-7xl mx-auto">
        <header className="flex flex-wrap justify-between items-center mb-8">
          <h1 className="text-3xl font-bold">بطولة النوماس</h1>
          <div>
            {isAdmin ? (
              <Button onClick={logout} variant="outline">تسجيل الخروج</Button>
            ) : (
              <Button onClick={handleLoginClick} variant="outline">تسجيل الدخول (الإدارة)</Button>
            )}
          </div>
        </header>

        <Tabs defaultValue="groups" className="w-full">
          <TabsList className="w-full grid grid-cols-2">
            <TabsTrigger value="groups">المجموعات</TabsTrigger>
            <TabsTrigger value="matches">المباريات</TabsTrigger>
          </TabsList>

          <TabsContent value="groups" className="space-y-6 mt-4">
            {groupsData.map(group => (
              <Card key={group.id} className="overflow-hidden">
                <CardHeader className="bg-primary text-primary-foreground">
                  <CardTitle>{group.name}</CardTitle>
                </CardHeader>
                <CardContent className="p-0">
                  <div className="overflow-x-auto">
                    <Table>
                      <TableHeader>
                        <TableRow>
                          <TableHead className="w-[100px]">الفريق</TableHead>
                          <TableHead className="text-center">لعب</TableHead>
                          <TableHead className="text-center">فوز</TableHead>
                          <TableHead className="text-center">تعادل</TableHead>
                          <TableHead className="text-center">خسارة</TableHead>
                          {!isMobile && (
                            <>
                              <TableHead className="text-center">له</TableHead>
                              <TableHead className="text-center">عليه</TableHead>
                              <TableHead className="text-center">الفارق</TableHead>
                            </>
                          )}
                          <TableHead className="text-center">النقاط</TableHead>
                        </TableRow>
                      </TableHeader>
                      <TableBody>
                        {group.teams.map(team => (
                          <TableRow key={team.id}>
                            <TableCell className="font-medium">{team.name}</TableCell>
                            <TableCell className="text-center">{team.played}</TableCell>
                            <TableCell className="text-center">{team.won}</TableCell>
                            <TableCell className="text-center">{team.drawn}</TableCell>
                            <TableCell className="text-center">{team.lost}</TableCell>
                            {!isMobile && (
                              <>
                                <TableCell className="text-center">{team.goalsFor}</TableCell>
                                <TableCell className="text-center">{team.goalsAgainst}</TableCell>
                                <TableCell className="text-center">{team.goalsFor - team.goalsAgainst}</TableCell>
                              </>
                            )}
                            <TableCell className="text-center font-bold">{team.points}</TableCell>
                          </TableRow>
                        ))}
                      </TableBody>
                    </Table>
                  </div>
                </CardContent>
              </Card>
            ))}
          </TabsContent>

          <TabsContent value="matches" className="space-y-4 mt-4">
            <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
              {matches.map(match => (
                <Card key={match.id} className="overflow-hidden">
                  <CardHeader className="bg-muted p-3">
                    <div className="text-center">
                      <div className="text-sm font-medium">{formatDate(match.date)}</div>
                      <div className="text-xs text-muted-foreground">{formatTime(match.date)}</div>
                    </div>
                  </CardHeader>
                  <CardContent className="p-4">
                    <div className="flex items-center justify-between mb-2">
                      <div className="text-sm font-medium text-center flex-1">{match.homeTeam}</div>
                      <div className="text-lg font-bold px-4">
                        {match.played ? `${match.homeGoals} - ${match.awayGoals}` : "VS"}
                      </div>
                      <div className="text-sm font-medium text-center flex-1">{match.awayTeam}</div>
                    </div>
                    <div className="flex justify-center mt-4">
                      <EditMatchControl 
                        onSave={(homeGoals, awayGoals) => handleEditMatch(match.id, homeGoals, awayGoals)}
                        initialHomeGoals={match.homeGoals || 0}
                        initialAwayGoals={match.awayGoals || 0}
                      />
                    </div>
                  </CardContent>
                </Card>
              ))}
            </div>
          </TabsContent>
        </Tabs>

        <footer className="mt-12 text-center text-sm text-gray-500">
          <p>© 2025 بطولة النوماس. جميع الحقوق محفوظة.</p>
        </footer>
      </div>
    </div>
  );
};

export default Index;
