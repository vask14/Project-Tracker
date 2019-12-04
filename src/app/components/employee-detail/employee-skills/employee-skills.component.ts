import { Component, OnInit, Input } from '@angular/core';
import staticData from '../../../shared/staticData';
import { SkillsService } from 'src/app/services/skills.service';

@Component({
  selector: 'app-employee-skills',
  templateUrl: './employee-skills.component.html',
  styleUrls: ['./employee-skills.component.css']
})
export class EmployeeSkillsComponent implements OnInit {
  public skills;
  public staticData = staticData;
  ObjectValues = Object.values;
  ObjectKeys = Object.keys;
  public enableEdit = false;
  public enableEditIndex = null;
  public addingSkill = false;
  public newSelectSkills;
  public newSelectLevel;
  public selected;
  @Input() employeeId: number;

  constructor(
    private skillService: SkillsService
  ) { }


  ngOnInit() {
    this.skillService.getEmployeeSkills(this.employeeId)
      .subscribe(skills => this.skills = skills);
  }

  enableEditMethod(i) {
    this.enableEdit = true;
    this.enableEditIndex = i;
  }

  cancelEdit() {
    this.enableEdit = false;
    this.enableEditIndex = null;
  }

  deleteSkill(id) {
    const empId = this.employeeId;
    this.skillService.deleteSkill({ id, empId }).subscribe(id => {
      this.skills = this.skills.filter(skill => skill.Id !== id)
    });
  }

  saveSagment(skill) {
    this.enableEditIndex = null;
    const updatedSkill = { 
      SkillId: +Object.keys(staticData.skillName).find(key => staticData.skillName[key] === skill.Name),
      EmployeeId: this.employeeId,
      LevelId: +Object.keys(staticData.Level).find(key => staticData.Level[key] === skill.LevelName)
    }
    this.skillService.updateSkill(updatedSkill).subscribe();
  }

  toggleAddingSkill() {
    const mappedId = this.skills.map(el => el.Id);
    this.newSelectSkills = Object.entries(staticData.skillName).filter(el => !mappedId.includes(+el[0])).map(el1 => ({ Id: el1[0],Name: el1[1] }));
    this.selected = this.newSelectSkills[0];
    this.addingSkill = !this.addingSkill;
  }

  newSave(addingSkill, newSelectLevel) {
    debugger;
    const newSkill = { LevelId:  +newSelectLevel, SkillId: +addingSkill.Id, EmployeeId: this.employeeId };
    this.skillService.addSkill(newSkill).subscribe(data => {
        this.skills.push(data);
        this.addingSkill = false;
    });
  }

}
