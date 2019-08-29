import ensureGitUpToDate from '@mindhive/deploy/ensureGitUpToDate'
import yarnPublish from '@mindhive/deploy/yarnPublish'
import del from 'del'
import gulp from 'gulp'
import ts from 'gulp-typescript'

const distDir = 'dist'

const tsProj = ts.createProject('src/tsconfig.json')

const clean = () => del(distDir)

const build = () =>
  tsProj
    .src()
    .pipe(tsProj())
    .pipe(gulp.dest(distDir))

export const dist = gulp.series(clean, build)

const gitUpToDate = () => ensureGitUpToDate('.')

const publish = () => yarnPublish({ packageDir: '.' })

export const release = gulp.series(gitUpToDate, dist, publish)
