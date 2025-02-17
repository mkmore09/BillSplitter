using Application.Other;
using Infrastructure;
using Microsoft.AspNetCore.Authentication.JwtBearer;
using Microsoft.IdentityModel.Tokens;
using Microsoft.OpenApi.Models;
using System.Text;

try
{
    var builder = WebApplication.CreateBuilder(args);

    // Add services to the container
    builder.Services.AddCors(options =>
    {
        options.AddPolicy("AllowSpecificOrigins", policy =>
        {
            policy.WithOrigins("http://localhost:5173")  
                  .AllowAnyHeader()
                  .AllowAnyMethod().
                  AllowCredentials(); ;
        });
    });
    builder.Services.AddInfrastructureServices(builder.Configuration);
    builder.Services.AddAuthentication(JwtBearerDefaults.AuthenticationScheme)
    .AddJwtBearer(options =>
    {
        var jwtSettings = builder.Configuration.GetSection("JwtSettings").Get<JwtSettings>();
        options.TokenValidationParameters = new TokenValidationParameters
        {
            ValidateIssuer = true,
            ValidateAudience = true,
            ValidateLifetime = true,
            ValidateIssuerSigningKey = true,
            ValidIssuer = jwtSettings.Issuer,
            ValidAudience = jwtSettings.Audience,
            IssuerSigningKey = new SymmetricSecurityKey(Encoding.UTF8.GetBytes(jwtSettings.Secret))
        };
    });
    builder.Services.AddSwaggerGen(options =>
    {
        options.AddSecurityDefinition("Bearer", new OpenApiSecurityScheme
        {
            In = ParameterLocation.Header,
            Name = "Authorization",
            Type = SecuritySchemeType.ApiKey,
            Scheme = "bearer",
            BearerFormat = "JWT",
            Description = "Please enter JWT with Bearer prefix"
        });

        options.AddSecurityRequirement(new OpenApiSecurityRequirement
    {
        {
            new OpenApiSecurityScheme
            {
                Reference = new OpenApiReference
                {
                    Type = ReferenceType.SecurityScheme,
                    Id = "Bearer"
                }
            },
            new string[] { }
        }
    });
    });
    builder.Services.AddAuthorization();
    builder.Services.AddControllers();
    builder.Services.AddHttpContextAccessor();
    builder.Services.AddEndpointsApiExplorer();

    var app = builder.Build();
    app.UseCors("AllowSpecificOrigins");
    if (app.Environment.IsDevelopment())
    {
        app.UseSwagger();
        app.UseSwaggerUI();
    }
    
    app.UseHttpsRedirection();
    app.UseAuthentication();  // Enables authentication
    app.UseAuthorization();
    app.MapControllers();
    app.Run();
}
catch (Exception ex)
{

}



