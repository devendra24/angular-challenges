import { Component,input } from '@angular/core';

@Component({
  selector: 'app-subscription',
  template: `
    <div>TestId: {{ testId() }}</div>
    <div>Permission: {{ permission() }}</div>
    <div>User: {{ user() }}</div>
  `,
})
export default class TestComponent {

  testId = input<string>();
  permission = input<string>();
  user = input<string>();
  // @Input() testId! : string;
  // @Input() permission! : string;
  // @Input() user! : string;

  // testId$ = this.activatedRoute.params.pipe(map((p) => p['testId']));
  // permission$ = this.activatedRoute.data.pipe(map((d) => d['permission']));
  // user$ = this.activatedRoute.queryParams.pipe(map((q) => q['user']));
}
