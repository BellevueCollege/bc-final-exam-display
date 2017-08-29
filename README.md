# BC Final Exam display
Plugin to display BC final exam schedule using a shortcode

## Shortcode documentation

* day1, day2, and day3: Days 1 and 3 are used (in that order) for M/W classes. Day 2 is used for T/Th classes. 
* quarter: Used for identification of note anchor. Can be left undefined- will use a random value. 
* first_label and second_label are used to pass in labels for the two text areas/tables

### Example
```
[bc-final-exams day1="Tuesday, 12/6" day2="Wednesday, 1/7" day3="Thursday, 1/8" quarter="Fall" first_label="<strong>Daily</strong> or <strong>Mon/Wed</strong> or <strong>Mon/Wed/Fri</strong>" second_label="<strong>Tues/Thurs</strong> or <strong>Tues/Thurs/Fri</strong>"]
```
