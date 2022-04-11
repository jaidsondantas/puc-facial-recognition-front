import { HttpClient } from '@angular/common/http';
import { Component, EventEmitter } from '@angular/core';
import { FormBuilder, FormGroup } from '@angular/forms';
import {
  humanizeBytes,
  UploaderOptions,
  UploadFile,
  UploadInput,
  UploadOutput
} from 'ngx-uploader';


class Answer {
  id: number;
  correct: boolean | undefined;
}
@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss'],
})
export class AppComponent {
  options: UploaderOptions;
  formData: FormData;
  files: UploadFile[];
  uploadInput: EventEmitter<UploadInput>;
  humanizeBytes: Function;
  dragOver: boolean;
  loading = false;
  mode: 'introduce' | 'recognition' = 'introduce';

  imgUpload = '';

  form: FormGroup;
  inputs: any[] = [];
  isLoadingLearning = false;

  answers: Answer[] = [];
  isTotal = false;

  constructor(
    private _formBuilder: FormBuilder,
    private _httpClient: HttpClient
  ) {
    this.options = { concurrency: 1, maxFileSize: 1000000 };
    this.files = []; // local uploading files array
    this.uploadInput = new EventEmitter<UploadInput>(); // input events, we use this to emit data to ngx-uploader
    this.humanizeBytes = humanizeBytes;

    this.form = this._formBuilder.group({});
  }

  onUploadOutput(output: UploadOutput): void {
    switch (output.type) {
      case 'allAddedToQueue':
        break;
      case 'addedToQueue':
        if (typeof output.file !== 'undefined') {
          this.files.push(output.file);
        }
        break;
      case 'uploading':
        if (typeof output.file !== 'undefined') {
          const index = this.files.findIndex(
            (file) =>
              typeof output.file !== 'undefined' && file.id === output.file.id
          );
          this.files[index] = output.file;
        }
        break;
      case 'removed':
        // remove file from array when removed
        this.files = this.files.filter(
          (file: UploadFile) => file !== output.file
        );
        break;
      case 'dragOver':
        this.dragOver = true;
        break;
      case 'dragOut':
      case 'drop':
        this.dragOver = false;
        break;
      case 'done':
        this.loading = false;
        const index = this.files.findIndex(
          (file) =>
            typeof output.file !== 'undefined' && file.id === output.file.id
        );
        this.imgUpload = this.files[index]?.response?.photo;
        this.setForms(this.files[index]?.response?.people);
        this.files = [];
        break;
    }
  }

  setForms(people: any[]): void {
    people.forEach((person, i) => {
      this.form.addControl(
        i.toString(),
        this._formBuilder.group({ person: [person?.person], id: [person?.id], precision: person?.precision })
      );
      this.answers.push({
        correct: undefined,
        id: person?.id
      });
    });

    Object.keys(this.form.value).forEach((v) => {
      this.inputs.push({
        field: v,
      });
    });

  }

  startUpload(): void {
    Object.keys(this.form.value).forEach((v) => {
      this.form.removeControl(v);
      this.inputs = [];
    });

    this.loading = true;
    const event: UploadInput = {
      type: 'uploadAll',
      url: 'http://localhost:5000/photos',
      method: 'POST',
    };

    this.uploadInput.emit(event);
  }

  cancelUpload(id: string): void {
    this.uploadInput.emit({ type: 'cancel', id: id });
  }

  title = 'puc-facial-recognition-front';

  learningIA(): void {
    this.isLoadingLearning = true;
    this.inputs.forEach((i) => {
      const body = {
        person: this.form.get(i?.field)?.value?.person?.id,
      };

      this._httpClient
        .put(
          `http://localhost:5000/photo/${this.form.get(i?.field)?.value?.id}`,
          body
        )
        .subscribe({
          next: (r) => {
            console.log(r);
            this.isLoadingLearning = false;
          },
        });
    });
  }

  changeMode(): void {
    this.mode = this.mode === 'introduce' ? 'recognition' : 'introduce';
  }

  doAnswer(correct: boolean, id: any): void {
    this.answers = this.answers.map((a) => {
      if (a.id === id) {
        return {
          ...a,
          correct,
        }
      }
      return a
    });

    console.log(this.answers);

  }

  disabledIndex(correct: boolean, id: any): boolean {
    return this.answers.find(a => a.id === id)?.correct === correct
  }

  calc(): number {
    const total = this.answers.length;
    const correct = this.answers.filter(a => a.correct === true).length
    this.isTotal = true;
    return correct / total;
  }
}
