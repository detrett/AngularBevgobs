using System;
using System.Text;
using AngularBevgobs.DAL;
using AngularBevgobs.Models;
using Microsoft.AspNetCore.Identity;
using Microsoft.EntityFrameworkCore;
using Newtonsoft.Json;
using Serilog;
using Microsoft.AspNetCore.Authentication.JwtBearer;
using Microsoft.IdentityModel.Tokens;

var builder = WebApplication.CreateBuilder(args);

// Retrieve configuration settings
var connectionString = builder.Configuration.GetConnectionString("ForumDbContextConnection") 
    ?? throw new InvalidOperationException("Connection string 'ForumDbContextConnection' not found.");

var jwtSettings = builder.Configuration.GetSection("JWTSettings");

// Configure MVC and NewtonsoftJson to avoid infinite loops
builder.Services.AddControllersWithViews();
builder.Services.AddControllers().AddNewtonsoftJson(options =>
{
    options.SerializerSettings.ReferenceLoopHandling = Newtonsoft.Json.ReferenceLoopHandling.Ignore;
    options.SerializerSettings.PreserveReferencesHandling = Newtonsoft.Json.PreserveReferencesHandling.Objects;
});

// Configure CORS
builder.Services.AddCors(options =>
{
    options.AddPolicy("MyAllowSpecificOrigins",
        builder => builder.WithOrigins("http://localhost:44468") 
            .AllowAnyMethod()
            .AllowAnyHeader());
});

// Configure Authentication with JWT
builder.Services.AddAuthentication(options =>
{
    options.DefaultAuthenticateScheme = JwtBearerDefaults.AuthenticationScheme;
    options.DefaultChallengeScheme = JwtBearerDefaults.AuthenticationScheme;
})
.AddJwtBearer(options =>
{
    options.TokenValidationParameters = new TokenValidationParameters
    {
        ValidateIssuer = true,
        ValidateAudience = true,
        ValidateLifetime = true,
        ValidateIssuerSigningKey = true,
        ValidIssuer = jwtSettings["validIssuer"],
        ValidAudience = jwtSettings["validAudience"],
        IssuerSigningKey = new SymmetricSecurityKey(Encoding.UTF8.GetBytes(jwtSettings["securityKey"]))
    };
});

// Configure Entity Framework and Identity
builder.Services.AddDbContext<ForumDbContext>(options =>
    options.UseSqlite(connectionString));

builder.Services.AddIdentity<ApplicationUser, IdentityRole<int>>()
    .AddEntityFrameworkStores<ForumDbContext>()
    .AddDefaultTokenProviders();

builder.Services.Configure<IdentityOptions>(options =>
{
    options.Password.RequireDigit = true;
    options.Password.RequireLowercase = true;
    options.Password.RequireUppercase = true;
    options.Password.RequireNonAlphanumeric = true;
    options.Password.RequiredLength = 6; 
});


// Adding the Forum Repository
builder.Services.AddScoped<IForumRepository, ForumRepository>();
// Adding the Subforum Repository
builder.Services.AddScoped<ISubforumRepository, SubforumRepository>();
// Adding the Thread Repository
builder.Services.AddScoped<IThreadRepository, ThreadRepository>();

builder.Services.AddScoped<ICommentRepository, CommentRepository>();


var app = builder.Build();

// Development environment setup
if (app.Environment.IsDevelopment())
{
    app.UseDeveloperExceptionPage();
}

// Static files and routing setup
app.UseStaticFiles();
app.UseRouting();

// Use CORS
app.UseCors("MyAllowSpecificOrigins");

// Authentication and Authorization middleware
app.UseAuthentication();
app.UseAuthorization();

// Define controller routes and fallback
app.MapControllerRoute(
    name: "default",
    pattern: "{controller}/{action=Index}/{id?}");
app.MapFallbackToFile("index.html");

app.Run();
