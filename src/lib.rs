mod utils;

use wasm_bindgen::prelude::*;
use rustfft::num_complex::Complex;
use rustfft::num_traits::Zero;
use rustfft::FFTplanner;

// When the `wee_alloc` feature is enabled, use `wee_alloc` as the global
// allocator.
#[cfg(feature = "wee_alloc")]
#[global_allocator]
static ALLOC: wee_alloc::WeeAlloc = wee_alloc::WeeAlloc::INIT;

#[wasm_bindgen]
pub fn apply_fft(data: &[f64]) -> Box<[f64]> {

    let mut input: Vec<Complex<f64>> = data.iter().map(|&x| Complex::new(x,1.0)).collect();
    let mut output: Vec<Complex<f64>> = vec![Complex::zero(); 1024];

    let mut planner = FFTplanner::new(false);
    let fft = planner.plan_fft(1024);
    fft.process(&mut input, &mut output);

    let vector: Vec<f64> = output.iter().map(|&x| x.re).collect();
    vector.into_boxed_slice()
}