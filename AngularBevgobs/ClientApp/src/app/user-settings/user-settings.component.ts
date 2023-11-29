import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { AuthService } from 'src/app/services/authentication.service';

@Component({
  selector: 'app-user-settings',
  templateUrl: './user-settings.component.html',
  styleUrls: ['./user-settings.component.css']
})
export class UserSettingsComponent implements OnInit {
  currentUser: any = {
    email: '',
    username: '',
    id: null,
  };
  settingsForm!: FormGroup;
  loading = false;
  errorMessage: string = '';
  successMessage: string = '';
  private selectedFile: File | undefined;

  constructor(
    private authService: AuthService,
    private formBuilder: FormBuilder
  ) {}

  ngOnInit() {
    this.initializeForm();
    this.loadCurrentUser();
  }

  private loadCurrentUser() {
    const userId = localStorage.getItem('userId');
    if (userId) {
      this.authService.getUserDetails(+userId).subscribe({
        next: (user) => {
          console.log('Loaded user:', user); // Add this line
          this.currentUser = { ...user, id: +userId }; // Ensure correct assignment
          this.updateFormValues(user);
        },
        error: (err) => {
          console.error('Error fetching user details:', err);
        }
      });
    } else {
      console.error('User ID not found in local storage');
    }
  }



  private initializeForm() {
    this.settingsForm = this.formBuilder.group({
      email: ['', [Validators.required, Validators.email]],
      username: ['', Validators.required],
      password: ['', [Validators.minLength(8)]]
    });
  }

  private updateFormValues(user: any) {
    this.settingsForm.patchValue({
      email: user.email,
      username: user.username
    });
  }

  onUpdateSettings() {
    if (this.settingsForm.valid) {
      this.loading = true;

      if (this.currentUser && this.currentUser.id) {

        let formData = new FormData();

        formData.append('id', this.currentUser.id.toString());
        formData.append('email', this.settingsForm.value.email || this.currentUser.email);
        formData.append('username', this.settingsForm.value.username || this.currentUser.username);


        if (this.settingsForm.value.password) {
          formData.append('password', this.settingsForm.value.password);
        }

        if (this.selectedFile) {
          formData.append('profilePicture', this.selectedFile, this.selectedFile.name);
        }

        console.log('Updating user with ID:', this.currentUser.id);
        console.log('Update data:', formData);

        this.authService.updateUserDetails(this.currentUser.id, formData).subscribe({
          next: (response) => {
            this.loading = false;
            this.successMessage = 'Update successful!';
            // Update the currentUser object with the new data
            this.currentUser = { ...this.currentUser, ...this.settingsForm.value };
          },
          error: (err) => {
            this.errorMessage = 'Error updating user settings';
            console.error('Error updating user settings:', err);
            this.loading = false;
          }
        });
      } else {
        this.errorMessage = 'Error: User ID is undefined or null';
        console.error('Error: User ID is undefined or null');
        this.loading = false;
      }
    } else {
      this.errorMessage = 'Error: Form is invalid';
      console.error('Error: Form is invalid', this.settingsForm.errors);
    }
  }




  imagePreviewUrl: string | null = null;

  onProfilePictureChange(event: Event): void {
    const element = event.currentTarget as HTMLInputElement;
    let fileList: FileList | null = element.files;
    if (fileList && fileList.length > 0) {
      this.selectedFile = fileList[0];

      // Create a URL for the selected file for preview
      const fileReader = new FileReader();
      fileReader.onload = () => {
        if (fileReader.result) {
          this.imagePreviewUrl = fileReader.result as string;
        }
      };
      fileReader.readAsDataURL(this.selectedFile);
    }
  }


  get isAuthenticated(): boolean {
    return this.authService.isAuthenticated();
  }

  logout() {
    this.authService.logout();
  }
}
