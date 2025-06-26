import { useState } from "react";
import { Formik, Form, Field, FieldArray, ErrorMessage } from "formik";
import * as Yup from "yup";
import { motion, AnimatePresence } from "framer-motion";
import { Check, ClipboardCopy } from "lucide-react";

const steps = ["Bot Details", "Context Setup", "Finish"];

const initialValues = {
  botname: "",
  bottype: "",
  model: "",
  language: "English",
  description: "",
  targetaudience: "",
  responsestyle: "",
  capabilities: [""],
  restrictedtopics: [""],
  websitecontext: [{ input: "", output: "" }],
  websitecontextJson: "",
  websiteurl: "",
};

const validationSchema = [
  Yup.object({
    botname: Yup.string().required("Required"),
    bottype: Yup.string().required("Required"),
    model: Yup.string().required("Required"),
    language: Yup.string().required("Required"),
    description: Yup.string().required("Required"),
    targetaudience: Yup.string().required("Required"),
    responsestyle: Yup.string().required("Required"),
  }),
  Yup.object({
    capabilities: Yup.array().of(Yup.string().required("Required")),
    restrictedtopics: Yup.array().of(Yup.string()),
    websitecontext: Yup.array().of(
      Yup.object({
        input: Yup.string().required("Required"),
        output: Yup.string().required("Required"),
      })
    ),
    websiteurl: Yup.string().url().required("Required")
  }),
];

export default function CreateBot() {
  const [step, setStep] = useState(0);
  const [apiKey, setApiKey] = useState(null);
  const [loading, setLoading] = useState(false);


  const next = async (validateForm, setTouched) => {
    const errors = await validateForm();
    if (Object.keys(errors).length === 0) {
      setStep((s) => Math.min(s + 1, steps.length - 1));
    } else {
      setTouched(
        Object.fromEntries(
          Object.keys(errors).map((key) => [key, true])
        )
      );
    }
  };

  const prev = () => setStep((s) => Math.max(s - 1, 0));

const handleSubmit = async (values) => {
  console.log("Submitting bot:", values);
  setLoading(true);
  setStep(2); // go to the final step

  // Simulate API call
  setTimeout(() => {
    const mockApiKey = "botly_" + Math.random().toString(36).substring(2, 15);
    setApiKey(mockApiKey);
    setLoading(false);
  }, 2000); // 2-second loading delay
};



  return (
    <div className="max-w-4xl w-full mx-auto mt-6 bg-white shadow-xl rounded-lg overflow-hidden p-6 md:p-10 text-black">
      <h1 className="text-3xl font-bold mb-6 text-center">Create Your Bot</h1>

      <div className="flex items-center justify-center gap-4 mb-8 flex-wrap">
        {steps.map((label, i) => (
          <div key={i} className="flex items-center gap-2">
            <div className={`w-7 h-7 rounded-full flex items-center justify-center text-sm font-bold ${
              i <= step ? 'bg-black text-white' : 'bg-gray-300 text-gray-700'
            }`}>{i + 1}</div>
            <span className={`text-sm ${i === step ? 'font-semibold' : 'text-gray-500'}`}>{label}</span>
            {i < steps.length - 1 && <div className="w-5 h-px bg-gray-400" />}
          </div>
        ))}
      </div>

      <Formik
        initialValues={initialValues}
        validationSchema={validationSchema[step]}
        onSubmit={handleSubmit}
      >
        {({ values, validateForm, setTouched, setFieldValue }) => (
          <Form className="space-y-6">
            <AnimatePresence mode="wait">
              <motion.div
                key={step}
                initial={{ opacity: 0, y: 10 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: -10 }}
                transition={{ duration: 0.4 }}
              >
                {step === 0 && (
                  <>
                    {[
                      { name: "botname", label: "Bot Name", placeholder: "e.g. My Support Bot" },
                      { name: "language", label: "Language", placeholder: "e.g. English, Hindi" },
                      { name: "description", label: "Description", placeholder: "Briefly describe your bot" },
                      { name: "targetaudience", label: "Target Audience", placeholder: "e.g. customers, students" },
                      { name: "responsestyle", label: "Response Style", placeholder: "e.g. friendly, professional" },
                    ].map(({ name, label, placeholder }) => (
                      <div key={name}>
                        <label className="block font-medium">{label}</label>
                        <Field
                          name={name}
                          placeholder={placeholder}
                          className="w-full p-2 border rounded-md mt-1"
                        />
                        <ErrorMessage name={name} component="div" className="text-red-500 text-sm" />
                      </div>
                    ))}

                    {/* Bot Type Dropdown */}
                    <div>
                      <label className="block font-medium">Bot Type</label>
                      <Field
                        as="select"
                        name="bottype"
                        className="w-full p-2 border rounded-md mt-1"
                      >
                        <option value="">Select Type</option>
                        <option value="assistant">Assistant</option>
                        <option value="support">Support Bot</option>
                        <option value="sales">Sales Bot</option>
                      </Field>
                      <ErrorMessage name="bottype" component="div" className="text-red-500 text-sm" />
                    </div>

                    {/* Model Dropdown */}
                    <div>
                      <label className="block font-medium">Model</label>
                      <Field
                        as="select"
                        name="model"
                        className="w-full p-2 border rounded-md mt-1"
                      >
                        <option value="">Select Model</option>
                        <option value="gemini">gemini</option>
                        <option value="deepseek/deepseek-r1-0528:free">deepseek</option>
                        <option value="grok">grok</option>
                      </Field>
                      <ErrorMessage name="model" component="div" className="text-red-500 text-sm" />
                    </div>
                  </>
                )}

{step === 1 && (
  <>
    {/* Capabilities */}
    <div>
      <label className="block font-medium">Capabilities</label>
      <FieldArray name="capabilities">
        {({ remove, push }) => (
          <div className="space-y-2">
            {values.capabilities.map((cap, i) => (
              <div key={i} className="flex gap-2">
                <Field
                  name={`capabilities.${i}`}
                  placeholder="e.g. Answer FAQs, Schedule meetings"
                  className="w-full p-2 border rounded-md"
                />
                <button type="button" onClick={() => remove(i)} className="text-red-500">✕</button>
              </div>
            ))}
            <button type="button" onClick={() => push("")} className="text-blue-600 text-sm">+ Add Capability</button>
          </div>
        )}
      </FieldArray>
    </div>

    {/* Restricted Topics */}
    <div>
      <label className="block font-medium">Restricted Topics</label>
      <FieldArray name="restrictedtopics">
        {({ remove, push }) => (
          <div className="space-y-2">
            {values.restrictedtopics.map((topic, i) => (
              <div key={i} className="flex gap-2">
                <Field
                  name={`restrictedtopics.${i}`}
                  placeholder="e.g. Politics, Religion"
                  className="w-full p-2 border rounded-md"
                />
                <button type="button" onClick={() => remove(i)} className="text-red-500">✕</button>
              </div>
            ))}
            <button type="button" onClick={() => push("")} className="text-blue-600 text-sm">+ Add Topic</button>
          </div>
        )}
      </FieldArray>
    </div>

    {/* Website Context Manual */}
    <FieldArray name="websitecontext">
      {({ push, remove }) => (
        <div className="space-y-2">
          <label className="block font-medium">Manual Context Entries</label>
          {values.websitecontext.map((ctx, i) => (
            <div key={i} className="border p-3 rounded-md space-y-2">
              <Field
                name={`websitecontext.${i}.input`}
                placeholder="e.g. What are your working hours?"
                className="w-full p-2 border rounded-md"
              />
              <Field
                name={`websitecontext.${i}.output`}
                placeholder="e.g. We are open from 9 AM to 6 PM, Mon-Fri."
                className="w-full p-2 border rounded-md"
              />
              <button type="button" onClick={() => remove(i)} className="text-red-500 text-sm">Remove</button>
            </div>
          ))}
          <button type="button" onClick={() => push({ input: "", output: "" })} className="text-blue-600 text-sm">+ Add Context</button>
        </div>
      )}
    </FieldArray>

    {/* JSON Context Paste */}
    <div>
      <label className="font-medium">Paste Context JSON</label>
      <textarea
        className="w-full mt-1 p-2 border rounded-md"
        rows={3}
        placeholder='[{"input": "hi", "output": "hello"}, {"input": "price of plan", "output": "$29/month"}]'
        onBlur={(e) => {
          try {
            const parsed = JSON.parse(e.target.value);
            const valid = parsed.every((item) => item.input && item.output);
            if (!valid) throw new Error();
            setFieldValue("websitecontext", parsed);
          } catch {
            alert("Invalid JSON format");
          }
        }}
      />
    </div>

    {/* CSV Upload */}
    <div>
      <label className="font-medium">Upload CSV</label>
      <input
        type="file"
        accept=".csv"
        onChange={(e) => {
          const file = e.target.files[0];
          if (!file) return;
          const reader = new FileReader();
          reader.onload = () => {
            const text = reader.result;
            const lines = text.split("\n").filter((line) => line.trim());
            const [header, ...rows] = lines;
            const parsed = rows.map((r) => {
              const [input, output] = r.split(",");
              return { input: input.trim(), output: output.trim() };
            });
            setFieldValue("websitecontext", parsed);
          };
          reader.readAsText(file);
        }}
        className="mt-1"
      />
      <p className="text-xs text-gray-500">CSV must have headers: input,output</p>
    </div>

    {/* Other Inputs */}
    <div>
      <label className="block font-medium">Website URL</label>
      <Field
        name="websiteurl"
        placeholder="e.g. https://www.example.com"
        className="w-full p-2 border rounded-md mt-1"
      />
      <ErrorMessage name="websiteurl" component="div" className="text-red-500 text-sm" />
    </div>
  </>
)}

{step === 2 && (
  <div className="text-center space-y-4 min-h-[200px] flex flex-col justify-center items-center">
    {loading ? (
      <>
        <svg className="animate-spin h-10 w-10 text-gray-500 mb-3" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
          <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4" />
          <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8v8H4z" />
        </svg>
        <p className="text-gray-700">Generating your API key...</p>
      </>
    ) : (
      <>
        <Check className="mx-auto text-green-600 w-12 h-12" />
        <h2 className="text-xl font-semibold">Bot Created Successfully!</h2>
        <p className="text-gray-700">Here is your API Key:</p>
        <div className="flex items-center justify-center gap-2">
          <code className="bg-gray-100 px-3 py-2 rounded">{apiKey}</code>
          <button
            type="button"
            onClick={() => navigator.clipboard.writeText(apiKey)}
            className="text-blue-600 text-sm flex items-center gap-1"
          >
            <ClipboardCopy className="w-4 h-4" /> Copy
          </button>
        </div>
      </>
    )}
  </div>
)}

              </motion.div>
            </AnimatePresence>

            {step < 2 && (
              <div className="flex justify-between mt-6">
                {step > 0 && (
                  <button
                    type="button"
                    onClick={prev}
                    className="text-gray-700 hover:underline"
                  >
                    ← Back
                  </button>
                )}
                <button
  type="button"
  onClick={async () => {
    if (step === steps.length - 2) {
      const errors = await validateForm();
      if (Object.keys(errors).length === 0) {
        // all good, submit the form
        document.querySelector("form").requestSubmit(); // triggers Formik's onSubmit
      } else {
        setTouched(
          Object.fromEntries(Object.keys(errors).map((key) => [key, true]))
        );
      }
    } else {
      next(validateForm, setTouched);
    }
  }}
  className="bg-black text-white px-6 py-2 rounded-md"
>
  {step === steps.length - 2 ? "Submit" : "Next →"}
</button>

              </div>
            )}
          </Form>
        )}
      </Formik>
    </div>
  );
}
