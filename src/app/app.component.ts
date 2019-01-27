import { Component } from "@angular/core";

@Component({
  selector: "app-root",
  templateUrl: "./app.component.html",
  styleUrls: ["./app.component.css"]
})
export class AppComponent {
  selectedSection;
  sections = [
    {
      name: "Registration",
      settings: [
        {
          key: "roll_no",
          name: "Roll Number",
          comments: "The registration number of the student",
          input: "input",
          value: 1
        },
        {
          key: "address",
          Name: "Address",
          comments: "Student Address",
          input: "input",
          value: "I-9"
        },
        {
          key: "foreigner",
          Name: "Is Foreigner",
          comments: "",
          input: "check_box",
          value: true
        }
      ]
    },
    {
      name: "Exam",
      settings: [
        {
          key: "roll_no",
          Name: "Roll Number",
          comments: "The registration number of the student",
          input: "input",
          value: 1
        },
        {
          key: "address",
          Name: "Address",
          comments: "Student Address",
          input: "input",
          value: "I-9"
        },
        {
          key: "foreigner",
          Name: "Is Foreigner",
          comments: "",
          input: "check_box",
          value: true
        }
      ]
    }
  ];

  constructor() {
    this.selectedSection = null;
  }
  logout() {}

  onSectionSelect(sec) {
    this.selectedSection = sec;
  }
}
