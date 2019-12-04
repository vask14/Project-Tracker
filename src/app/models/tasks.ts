export class Task {
    Name: string;
    Description: string;
    Estimate: number;
    StartDate: string;
    EndDate: any;
    TicketType: string;
    Timesheets: any;
    StatusId: number;
    Status: string;
    ResponsibleId: number;
    Project: string;
    TypeId: number;
    ProjectId: number;
    Reporter: {
      FullName: string;
    };
    Responsible: {
      FullName: string;
    };
    ReporterId: number;
    Id: number;
}