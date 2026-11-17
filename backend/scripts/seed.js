import 'dotenv/config';
import mongoose from 'mongoose';
import Project from '../src/models/Project.js';

const sampleProjects = [
  {
    title: 'ASTRAHEALTH AI',
    description: 'An AI-powered health and mission environment dashboard concept for monitoring health and environmental signals.',
    techStack: ['React', 'Python', 'FastAPI', 'AI/ML'],
    liveUrl: '',
    githubUrl: 'https://github.com/',
    featured: true
  },
  {
    title: 'Job Board API',
    description: 'A backend application for managing job listings and related application data with REST APIs.',
    techStack: ['Node.js', 'Express', 'MongoDB'],
    liveUrl: '',
    githubUrl: 'https://github.com/',
    featured: true
  },
  {
    title: 'Student Grade Management',
    description: 'A Java console application to register students, record course scores and calculate cumulative GPA.',
    techStack: ['Java', 'OOP', 'CSV'],
    liveUrl: '',
    githubUrl: 'https://github.com/',
    featured: false
  }
];

try {
  await mongoose.connect(process.env.MONGODB_URI || 'mongodb://127.0.0.1:27017/personal_portfolio');
  await Project.deleteMany({});
  await Project.insertMany(sampleProjects);
  console.log('Sample projects inserted successfully.');
} catch (error) {
  console.error(error);
  process.exitCode = 1;
} finally {
  await mongoose.disconnect();
}
