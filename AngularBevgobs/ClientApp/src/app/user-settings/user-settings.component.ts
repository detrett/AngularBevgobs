import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { AuthService } from 'src/app/services/authentication.service';

@Component({
  selector: 'app-user-settings',
  templateUrl: './user-settings.component.html',
  styleUrls: ['./user-settings.component.css']
})
export class UserSettingsComponent implements OnInit {
  // Initialize currentUser with default values to avoid null/undefined issues
  currentUser: any = {
    email: '',
    username: '',
    id: null,
    // Add other properties if necessary
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
          this.currentUser = user;
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
      // Update other form controls here if needed
    });
  }

  onUpdateSettings() {
    if (this.settingsForm.valid) {
      this.loading = true;
      let updatedUserData = this.settingsForm.value;

      // Check if password is empty, if so, remove it from the update payload
      if (!updatedUserData.password) {
        delete updatedUserData.password;
      }

      // Add the user ID to the update payload
      updatedUserData = {
        ...updatedUserData,
        id: this.currentUser.id
      };

      this.authService.updateUserDetails(this.currentUser.id, updatedUserData).subscribe({
        next: (response) => {
          console.log('User settings updated', response);
          this.loading = false;
          this.successMessage = 'Update successful!';

          this.currentUser = {
            ...this.currentUser,
            ...updatedUserData
          };
        },
        error: (err) => {
          this.errorMessage = 'Error updating user settings';
          console.error('Error updating user settings:', err);
          this.loading = false;
        }
      });
    }
  }

  imagePreviewUrl: string | null = null;

  onProfilePictureChange(event: Event): void {
    const element = event.currentTarget as HTMLInputElement;
    let fileList: FileList | null = element.files;
    if (fileList && fileList.length > 0) {
      this.selectedFile = fileList[0];

      // Create a URL for the selected file
      const fileReader = new FileReader();
      fileReader.onload = () => {
        if (fileReader.result) {
          this.imagePreviewUrl = fileReader.result as string;
        }
      };
      fileReader.readAsDataURL(this.selectedFile);
    }
  }


}
